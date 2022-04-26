import { createSlice } from '@reduxjs/toolkit'
import { LoginInputErrors, LoginInputs, SignupInputErrors, SignupInputs } from '../../library/types'
import { loginThunk, logoutThunk, signupThunk } from '../thunks/user';

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
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        clearForm: (state: LoginState) => state = initialState,
        isSaving: (state: LoginState) => { state.isSaving = !state.isSaving },
        updatePageError: (state: LoginState, action) => { state.login_error = action.payload },
        switchToLoginForm: (state: LoginState) => { 
            state.login_inputs.username = state.signup_inputs.username
            state.login_inputs.password = state.signup_inputs.password
            state.isLoginForm = true 
        },
        switchToSignupForm: (state: LoginState) => { 
            state.signup_inputs.username = state.login_inputs.username
            state.signup_inputs.password = state.login_inputs.password
            state.isLoginForm = false
        },  
        updateLoginFormInputs: (state: LoginState, action) => { state.login_inputs = action.payload },
        updateLoginFormErrors: (state: LoginState, action) => { state.login_input_errors = action.payload },
        updateSignupFormInputs: (state: LoginState, action) => { state.signup_inputs = action.payload },
        updateSignupFormErrors: (state: LoginState, action) => { state.signup_input_errors = action.payload }
    }, 
    extraReducers: (builder) => {
        builder.addCase(loginThunk.rejected, (state: LoginState, action) => { state.login_error = (action.payload as string) })
        builder.addCase(signupThunk.rejected, (state: LoginState, action) => { state.login_error = (action.payload as string) })
        builder.addCase(logoutThunk.rejected, (state: LoginState) => state = initialState)
        builder.addCase(logoutThunk.fulfilled, (state: LoginState) => state = initialState)
    }
})

export default loginSlice.reducer;
