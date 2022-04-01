import { LoginInputErrors, LoginInputs, SignupInputErrors, SignupInputs } from '../reducers/loginPageReducer'
import actions from './actionLang'

const setLoginPageError = (login_error: string) => {
    return {
        type: actions.SET_LOGIN_ERROR,
        payload: { login_error }
    }
}

const updateLoginInputs = (login_inputs: LoginInputs) => {
    return {
        type: actions.UPDATE_LOGIN_INPUTS,
        payload: { login_inputs }
    }
}

const updateSignupInputs = (signup_inputs: SignupInputs) => {
    return {
        type: actions.UPDATE_SIGNUP_INPUTS,
        payload: { signup_inputs }
    }
}

const updateLoginInputErrors = (login_input_errors: LoginInputErrors) => {
    return {
        type: actions.UPDATE_LOGIN_INPUT_ERRORS,
        payload: { login_input_errors }
    }
}

const updateSignupInputErrors = (signup_input_errors: SignupInputErrors) => {
    return {
        type: actions.UPDATE_SIGNUP_INPUT_ERRORS,
        payload: { signup_input_errors }
    }
}

const clearForm = () => {
    return {
        type: actions.LOGIN_PAGE_CLEAR_FORM
    }
}

const toggleIsSaving = () => {
    return { type: actions.LOGIN_PAGE_TOGGLE_IS_SAVING  }
}

const toggleIsLoginForm = () => {
    return { type: actions.LOGIN_PAGE_TOGGLE_IS_LOGIN_FORM  }
}

const resetLoginPage = () => {
    return { type: actions.RESET_LOGIN_PAGE }
}

const handleFormSwitchToSignup = () => {
    return { 
        type: actions.LOGIN_PAGE_HANDLE_FORM_SWITCH_TO_SIGNUP
    }
}

const handleFormSwitchToLogin = () => {
    return { 
        type: actions.LOGIN_PAGE_HANDLE_FORM_SWITCH_TO_LOGIN
    }
}

const loginPageActions = {
    clearForm,
    setLoginPageError,
    resetLoginPage,
    toggleIsSaving,
    toggleIsLoginForm,
    updateLoginInputs,
    updateSignupInputs,
    updateLoginInputErrors,
    updateSignupInputErrors,
    handleFormSwitchToLogin,
    handleFormSwitchToSignup
}

export default loginPageActions
