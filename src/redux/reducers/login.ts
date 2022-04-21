import { createAction, createReducer } from '@reduxjs/toolkit'
import { LoginInputErrors, LoginInputs, SignupInputErrors, SignupInputs } from '../../library/types'

/** TYPES */
export interface LoginState { 
    login_error: string;
    login_inputs: LoginInputs;
    signup_inputs: SignupInputs;
    login_input_errors: LoginInputErrors;
    signup_input_errors: SignupInputErrors;
    isSaving: boolean;
    isLoginForm: boolean;
}

/** ACTIONS */
export const clearForm = createAction('login/clearForm');
export const toggleIsSaving = createAction('login/isSaving');
export const updatePageError = createAction<string>('login/updatePageError');
export const switchToLoginForm  = createAction('login/switchToLoginForm');
export const switchToSignupForm = createAction('login/switchToSignupForm');
export const updateLoginFormInputs  = createAction<LoginInputs>('login/updateLoginFormInputs');
export const updateLoginFormErrors  = createAction<LoginInputErrors>('login/updateLoginFormErrors');
export const updateSignupFormInputs = createAction<SignupInputs>('login/updateSignupFormInputs');
export const updateSignupFormErrors = createAction<SignupInputErrors>('login/updateSignupFormErrors');

/** INITIAL STATE */
const initialState: LoginState = { 
    login_error: '',
    login_inputs: {},
    signup_inputs: {},
    login_input_errors: {},
    signup_input_errors: {},
    isSaving: false,
    isLoginForm: true
};

/** REDUCER */
export const loginReducer = createReducer(initialState, builder => {
    builder.addCase(clearForm, (state: LoginState) => state = initialState);
    builder.addCase(toggleIsSaving, (state: LoginState) => { state.isSaving = !state.isSaving });
    builder.addCase(updatePageError, (state: LoginState, action) => { state.login_error = action.payload })
    builder.addCase(switchToLoginForm, (state: LoginState) => { 
        state.login_inputs.username = state.signup_inputs.username
        state.login_inputs.password = state.signup_inputs.password
        state.isLoginForm = true 
    });
    builder.addCase(switchToSignupForm, (state: LoginState) => { 
        state.signup_inputs.username = state.login_inputs.username
        state.signup_inputs.password = state.login_inputs.password
        state.isLoginForm = false
    });
    builder.addCase(updateLoginFormInputs, (state: LoginState, action) => { state.login_inputs = action.payload })
    builder.addCase(updateLoginFormErrors, (state: LoginState, action) => { state.login_input_errors = action.payload })
    builder.addCase(updateSignupFormInputs, (state: LoginState, action) => { state.signup_inputs = action.payload })
    builder.addCase(updateSignupFormErrors, (state: LoginState, action) => { state.signup_input_errors = action.payload })
})
