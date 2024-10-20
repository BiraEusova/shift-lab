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
            <label htmlFor="phone-number">Введите номер телефона</label>
            <input
                className={errors.phone ? "invalid-input" : ""}
                type="tel"
                id="phone-number"
                onInput={onChangeValidate}
                placeholder={"89618878701"}
                {...register('phone', { required: true })}
            />
            <div className={"input-error-message"}>
                {errors.phone?.type === 'required' && <p>Поле является обязательным</p>}
            </div>
            <button type="submit">Получить код</button>
        </form>
    );
};

export default PhoneForm;