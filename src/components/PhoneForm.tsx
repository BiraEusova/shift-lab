import {useForm} from 'react-hook-form';

interface FormValues {
    phone: string
}
const PhoneForm = (props: {onSubmitPhone: (phone: string) => void }) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        props.onSubmitPhone(data.phone);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="phone-number">Номер телефона:</label>
            <input
                type="tel"
                id="phone-number"
                {...register('phone', {required: true, pattern: /^\d+$/})}
            />
            {errors.phone?.type === 'required' && <div>Пожалуйста, введите номер телефона.</div>}
            {errors.phone?.type === 'pattern' && <div>Пожалуйста, введите только цифры.</div>}
            <button type="submit">Получить код</button>
        </form>
    );
};

export default PhoneForm;