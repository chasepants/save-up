import { createAction, createReducer } from '@reduxjs/toolkit';

/** TYPES */
export interface AuthState { 
    valid: boolean; 
    token: string; 
    error: string;
}

/** ACTIONS */
export const clearAuth = createAction('auth/clear');
export const updateAuth = createAction<string>('auth/update');
export const updateToken = createAction<string>('auth/udpateToken');
export const updateError = createAction<string>('auth/udpateError');
export const updateIsValid = createAction<boolean>('auth/udpateIsValid');

/** INITIAL STATE */
const initalState: AuthState = { valid: false, token: '', error: '' };

/** REDUCER */
export const authReducer = createReducer(initalState, builder => {
    builder.addCase(clearAuth, (state: AuthState) => state = initalState)
    builder.addCase(updateToken, (state: AuthState, action) => { state.token = action.payload })
    builder.addCase(updateError, (state: AuthState, action) => { state.error = action.payload })
    builder.addCase(updateIsValid, (state: AuthState, action) => { state.valid = action.payload })
    builder.addCase(updateAuth, (state: AuthState, action) => { 
        state.error = ''
        state.valid = true 
        state.token = action.payload
    })
})
