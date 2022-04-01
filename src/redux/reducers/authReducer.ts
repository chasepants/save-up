import { Action } from 'redux';
import actions from '../actions/actionLang'

export type AuthAction = Action & {payload: AuthActionPayload};
export type DefaultAuth = {valid: boolean, token: string, error: string};
export type AuthActionPayload = Action & DefaultAuth;
const defaultAuth: DefaultAuth = {valid: false, token: '', error: ''};
export default function auth(auth = defaultAuth, action: AuthAction): DefaultAuth {
    switch (action.type) {
        case actions.UPDATE_AUTH_VALID:
            return {
                ...auth,
                valid: action.payload.valid
            }
        case actions.UPDATE_AUTH_TOKEN:
            return {
                ...auth,
                token: action.payload.token
            }
        case actions.UPDATE_AUTH:
            return {
                valid: true,
                token: action.payload.token,
                error: "",
            }
        case actions.CLEAR_AUTH:
            return {
                valid: false,
                token: "",
                error: "",
            }
        default:
            return auth
    }
}
