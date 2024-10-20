import { useForm } from 'react-hook-form';

const PhoneForm = (props: {onSubmitPhone: (phone: string) => void }) => {

    const {register, setValue, handleSubmit, reset, formState: {errors}} = useForm<{ phone: string }>( );

    const onSubmit = (data: { phone: string }) => {
        props.onSubmitPhone(data.phone);
        reset();
    }

    const onChangeValidate = (e) => {
        const validateVal = e.target.value.replace(/[^0-9]/g, '');
        setValue('phone',  validateVal);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="phone-number">Номер телефона:</label>
            <input
                type="tel"
                id="phone-number"
                onInput={onChangeValidate}
                {...register('phone', { required: true })}
            />
            {errors.phone?.type === 'required' && <div>Поле является обязательным</div>}
            <button type="submit">Получить код</button>
        </form>
    );
};

export default PhoneForm;