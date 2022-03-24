import { Action } from 'redux';
import actions from '../actions/actionLang'

export type LoginPageAction = Action & {payload: LoginPageActionPayload};
export type LoginInputs = { username?: string, password?: string}
export type SignupInputs = { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }
export type LoginInputErrors = { username?: string, password?: string}
export type SignupInputErrors = { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }

export type DefaultLoginPage = { 
    login_error: string,
    login_inputs: LoginInputs,
    signup_inputs: SignupInputs,
    login_input_errors: LoginInputErrors,
    signup_input_errors: SignupInputErrors,
    isSaving: boolean,
    isLoginForm: boolean
}

export type LoginPageActionPayload = Action & DefaultLoginPage;
const defaultLoginPage: DefaultLoginPage = { 
    login_error: '',
    login_inputs: {},
    signup_inputs: {},
    login_input_errors: {},
    signup_input_errors: {},
    isSaving: false,
    isLoginForm: true
};

export default function loginPageReducer(loginPage = defaultLoginPage, action: LoginPageAction) {
    switch (action.type) {
        case actions.SET_LOGIN_ERROR:
            return {
                ...loginPage,
                login_error: action.payload.login_error
            }
        case actions.UPDATE_LOGIN_INPUTS:
            return {
                ...loginPage,
                login_inputs: action.payload.login_inputs
            }
        case actions.UPDATE_SIGNUP_INPUTS:
            return {
                ...loginPage,
                signup_inputs: action.payload.signup_inputs
            }
        case actions.UPDATE_LOGIN_INPUT_ERRORS:
            return {
                ...loginPage,
                login_input_errors: action.payload.login_input_errors
            }
        case actions.UPDATE_SIGNUP_INPUT_ERRORS:
            return {
                ...loginPage,
                signup_input_errors: action.payload.signup_input_errors
            }
        case actions.LOGIN_PAGE_TOGGLE_IS_SAVING:
            return {
                ...loginPage,
                isSaving: !loginPage.isSaving
            }
        case actions.LOGIN_PAGE_TOGGLE_IS_LOGIN_FORM:
            return {
                ...loginPage,
                isLoginForm: !loginPage.isLoginForm
            }
        case actions.LOGIN_PAGE_CLEAR_FORM: 
            return {
                ...loginPage,
                login_error: '',
                login_inputs: {},
                signup_inputs: {},
                login_input_errors: {},
                signup_input_errors: {},
                isSaving: false
            }
        case actions.LOGIN_PAGE_HANDLE_FORM_SWITCH_TO_SIGNUP:
            let signup_inputs: SignupInputs = { username: loginPage.login_inputs.username, password: loginPage.login_inputs.password}
            return {
                signup_inputs: signup_inputs,
                login_error: '',
                isSaving: false,
                login_inputs: {},
                login_input_errors: {},
                signup_input_errors: {},
                isLoginForm: false
            }
        case actions.LOGIN_PAGE_HANDLE_FORM_SWITCH_TO_LOGIN:
            let login_inputs: LoginInputs = { username: loginPage.signup_inputs.username, password: loginPage.signup_inputs.password}
            return {
                login_inputs: login_inputs,
                login_error: '',
                isSaving: false,
                signup_inputs: {},
                login_input_errors: {},
                signup_input_errors: {},
                isLoginForm: true
            }
        case actions.RESET_LOGIN_PAGE:
        default:
            return loginPage
    }
}
