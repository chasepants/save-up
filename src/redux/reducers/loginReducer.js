import actions from '../actions/actionLang'

export default function login(login = {}, action) {
    switch (action.type) {
        case actions.SET_LOGIN_ERROR:
            return {
                ...login,
                login_error: action.payload.login_error
            }
        default:
            return login
    }
}