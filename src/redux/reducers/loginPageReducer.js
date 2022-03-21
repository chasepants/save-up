import actions from '../actions/actionLang'

export default function loginPageReducer(loginPage = {}, action) {
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