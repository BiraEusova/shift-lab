import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { createOTPActionCreator, signInActionCreator, getSessionActionCreator } from './actions';
import {User} from "../types";

//??
interface AuthState {
    loading: boolean,
    error: string | null,
    userData: User | null,
    token: string | null,
    auth: boolean,
    retryDelay: number
}

const initialState: AuthState = {
    loading: false,
    error: null,
    userData: null,
    token: null,
    auth: false,
    retryDelay: 0
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.auth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOTPActionCreator.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOTPActionCreator.fulfilled, (state: AuthState, action: any) => {
                state.loading = false;
                state.error = null;
                state.retryDelay = action.payload.retryDelay;
                console.log(action.payload.retryDelay)
            })
            .addCase(createOTPActionCreator.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = "error createOTP";
                console.log("error createOTP");
            })
            .addCase(signInActionCreator.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInActionCreator.fulfilled, (state: AuthState, action: any) => {
                state.loading = false;
                state.error = null;
                state.token = action.payload.token;
                state.userData = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                state.auth = true;
            })
            .addCase(signInActionCreator.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = "error signIn";
                state.auth = false;
                console.log("error signIn");
            })
            .addCase(getSessionActionCreator.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSessionActionCreator.fulfilled, (state: AuthState, action: any) => {
                state.loading = false;
                state.error = null;
                state.userData = action.payload.user;
            })
            .addCase(getSessionActionCreator.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = "error getSession";
                state.auth = false;
                console.log("error getSession");
            });
    }
});

export default authSlice.reducer;