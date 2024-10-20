import { api } from './instance';
import {AxiosResponse} from "axios";
import {CreateOtpDto, OtpResponse, SessionResponse, SignInDto, SignInResponse} from "../types";

export const createOtp = async (phoneToGetOtp: CreateOtpDto) => {
    const response = await api.post<OtpResponse, AxiosResponse<OtpResponse>>('/auth/otp', phoneToGetOtp);
    return response.data;
}

export const signIn = async (signInData: SignInDto) => {
    const response = await api.post<SignInResponse, AxiosResponse<SignInResponse>>(`/users/signin`, signInData);
    return response.data;
}

export const getSession = async () => {
    const response = await api.get<SessionResponse, AxiosResponse<SessionResponse>>(`/users/session`);
    return response.data;
}
