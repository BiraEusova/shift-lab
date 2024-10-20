import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

interface FormValues {
    otp: number;
}

const OtpForm = (props: {
    onSubmitOtp: (otp: number) => void,
    resendOTP: (phone: string) => void
}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValues>();
    const [countdown, setCountdown] = useState<number>(40);
    const [showResendButton, setShowResendButton] = useState<boolean>(false);

    const onSubmit = (data: FormValues) => {
        props.onSubmitOtp(data.otp);
        reset();
    };

    const handleResendOTP = async (formValues) => {
        props.resendOTP(formValues.otp)
        setCountdown(40);
        setShowResendButton(false);
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;

        timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            setShowResendButton(true);
        }
    }, [countdown]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="otp">Введите OTP-код:</label>
            <input
                type="text"
                id="otp"
                {...register('otp', {required: true, minLength: 6, maxLength: 6, pattern: /^\d+$/})}
            />
            {(errors.otp?.type === 'minLength'
                || errors.otp?.type === 'maxLength'
                || errors.otp?.type === 'required') && (
                <div>Код должен состоять из 6 цифр</div>
            )}
            {/*{errors.otp?.type === 'pattern' && <div>OTP-код должен состоять только из цифр.</div>}*/}
            {!showResendButton && <p>Отправить код повоторно через {countdown}с</p>}
            {showResendButton && (
                <button type="button" onClick={handleResendOTP}>
                    Отправить код повторно
                </button>
            )}
            <button type="submit">Подтвердить</button>
        </form>
    );
};

export default OtpForm;