import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, signupThunk } from '../thunks/user';

/** TYPES */
export interface AuthState { 
    valid: boolean; 
    token: string; 
    error: string;
}

/** INITIAL STATE */
const initalState: AuthState = { valid: false, token: '', error: '' };

export const authSlice = createSlice({
    name: 'auth',
    reducers: {
        clearAuth: (state: AuthState) => state = initalState,
        updateToken: (state: AuthState, action) => { state.token = action.payload },
        updateError: (state: AuthState, action) => { state.error = action.payload },
        updateIsValid: (state: AuthState, action) => { state.valid = action.payload },
        updateAuth: (state: AuthState, action) => { 
            state.error = ''
            state.valid = true 
            state.token = action.payload
        }
    },
    extraReducers: builder => { 
        /** SIGNUP */
        builder.addCase(signupThunk.fulfilled, (state: AuthState) => { state.valid = true });
        builder.addCase(signupThunk.rejected, (state: AuthState) => state = initalState);
        /** LOGIN */
        builder.addCase(loginThunk.fulfilled, (state: AuthState) => { state.valid = true });
        builder.addCase(loginThunk.rejected, (state: AuthState) => state = initalState);
        /** LOGOUT */
        builder.addCase(logoutThunk.fulfilled, (state: AuthState) => state = initalState);
    },
    initialState: initalState
})

/** REDUCER */
export default authSlice.reducer
