import { Action } from 'redux';
import actions from '../actions/actionLang'

export type LoginPageAction = Action & {payload: LoginPageActionPayload};
export type DefaultLoginPage = {login_error: string}
export type LoginPageActionPayload = Action & DefaultLoginPage;
const defaultLoginPage = {login_error: ''};

export default function loginPageReducer(loginPage = defaultLoginPage, action: LoginPageAction) {
    switch (action.type) {
        case actions.SET_LOGIN_ERROR:
            return {
                ...loginPage,
                login_error: action.payload.login_error
            }
        default:
            return loginPage
    }
}