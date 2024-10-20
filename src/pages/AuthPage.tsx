import {useEffect, useState} from "react";
import {useAppDispatch} from "../store/hook.ts";
import PhoneForm from "../components/PhoneForm.tsx";
import {createOTPActionCreator, getSessionActionCreator, signInActionCreator} from "../store/actions.ts";
import {useAppSelector} from "../store/hook.ts";
import OtpForm from "../components/OtpForm.tsx";

const AuthPage = () => {

    const [phone, setPhone] = useState('');
    const dispatch = useAppDispatch();
    const {token, retryDelay} = useAppSelector(state => state.auth);

    const onSubmitOtp = async (otp: number) => {
        await dispatch(signInActionCreator({phoneNumber: phone, otp: otp}));
        if (token) { dispatch(getSessionActionCreator(token));}
    }

    const sendOTP = async (newPhone?: string) => {
        console.log(newPhone)
        if (newPhone) {
            setPhone(newPhone);
        }
        await dispatch(createOTPActionCreator(newPhone ?? phone));
    };

    // Изначально я сделала одну форму, но она была не читабельная,
    // поэтому я разнесла ее на две.
    return (
        <>
            {!phone && <PhoneForm onSubmitPhone={sendOTP}/>}
            {phone && <OtpForm onSubmitOtp={onSubmitOtp} resendOTP={sendOTP} retryDelay={retryDelay}/>}
        </>
    );
}

export default AuthPage