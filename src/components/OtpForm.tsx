import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Button from "./Button/Button.tsx";

const OtpForm = (props: {
    onSubmitOtp: (otp: number) => void,
    resendOTP: () => void,
    retryDelay: number
}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<{ otp: number }>();
    const [countdown, setCountdown] = useState<number>(Math.round(props.retryDelay / 1000));
    const [showResendButton, setShowResendButton] = useState<boolean>(false);

    const onSubmit = (data: { otp: number }) => {
        props.onSubmitOtp(data.otp);
        reset();
    };

    const handleResendOTP = async (formValues) => {
        props.resendOTP()
        setCountdown(Math.round(props.retryDelay / 1000));
        setShowResendButton(false);
        reset();
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
            <label htmlFor="otp">Введите код:</label>
            <input
                className={errors.otp ? "invalid-input" : ""}
                type="number"
                id="otp"
                {...register('otp', {required: true, minLength: 6, maxLength: 6, pattern: /^\d+$/})}
            />
            <div className={"input-error-message"}>
                {(errors.otp?.type === 'minLength'
                    || errors.otp?.type === 'maxLength'
                    || errors.otp?.type === 'required') && (
                    <p>Код должен состоять из 6 цифр</p>
                )}
            </div>

            <Button type="submit" variant="primary">Подтвердить</Button>
            <Button
                type="button"
                variant="secondary"
                disabled={!showResendButton}
                onClick={handleResendOTP}
            >
                {"Отправить код повторно"}{!showResendButton && ` через ${countdown}с`}
            </Button>
        </form>
    );
};

export default OtpForm;