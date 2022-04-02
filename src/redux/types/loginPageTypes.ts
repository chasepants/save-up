import { Action } from 'redux';

/** INTERFACES */
export interface LoginInputErrors { username?: string, password?: string}
export interface SignupInputErrors { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }

/** TYPES */
export type LoginPageAction = Action & {payload: LoginPageActionPayload};
export type LoginInputs = { username?: string, password?: string}
export type SignupInputs = { username?: string, password?: string, confirm_password?: string, firstname?: string, lastname?: string }
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

/** HELPERS */
export function getLoginInputErrorByKey(key: string, errors: LoginInputErrors) {
    switch(key) {
      case 'username':
          return errors.username ?? '';
      case 'password':
          return errors.password ?? '';
      default:
          return '';
    }
}
  
export function getSignupInputErrorByKey(key: string, errors: SignupInputErrors) {
    switch(key) {
      case 'username':
          return errors.username ?? '';
      case 'password':
          return errors.password ?? '';
      case 'confirm_password':
          return errors.confirm_password ?? '';
      case 'firstname':
          return errors.firstname ?? '';
      case 'lastname':
          return errors.lastname ?? '';
      default:
        return '';

    }
}
