import { createAsyncThunk } from '@reduxjs/toolkit';
import {createOtp, getSession, signIn} from "../api/requests.ts";

export const createOTPActionCreator = createAsyncThunk(
    'auth/createOTP',
    async (phoneNumber: string, thunkAPI) => {
        return await createOtp({phone: phoneNumber})
    }
);

export const signInActionCreator = createAsyncThunk(
    'auth/signIn',
    async ({ phoneNumber, otp }: { phoneNumber: string; otp: number }, thunkAPI) => {
        console.log(phoneNumber, otp);
        return await signIn({phone: phoneNumber, code: otp})
    }
);

export const getSessionActionCreator = createAsyncThunk(
    'auth/getSession',
    async (thunkAPI) => {
        return await getSession()
    }
);
