import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {createOtpAction} from "../storere/actions/userAuthActionCreator.ts";
import {useAppDispatch} from "../storere/hook.ts";
import PhoneForm from "../components/PhoneForm.tsx";
import {createOTPActionCreator, getSessionActionCreator, signInActionCreator} from "../store/actions.ts";
import {useAppSelector} from "../store/hook.ts";
import OtpForm from "../components/OtpForm.tsx";

const AuthPage = () => {

    const [phone, setPhone] = useState('');
    const dispatch = useAppDispatch();
    const {loading, error, token, userData} = useAppSelector(state => state.auth);

    const onSubmitPhone = async (phone: string) => {
        await dispatch(createOTPActionCreator(phone));
        setPhone(phone);
    }

    const onSubmitOtp = async (otp: number) => {
        await dispatch(signInActionCreator({phoneNumber: phone, otp: otp}));
        if (token) { dispatch(getSessionActionCreator(token));}
    }

    const resendOTP = async (phone: string) => {
        await dispatch(createOTPActionCreator(phone));
    };

    return (
        <>
            {!phone && <PhoneForm onSubmitPhone={onSubmitPhone}/>}
            {phone && <OtpForm onSubmitOtp={onSubmitOtp} resendOTP={resendOTP}/>}
        </>
    );
}

export default AuthPage