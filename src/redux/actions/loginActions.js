import actions from './actionLang'

const setLoginPageError = login_error => {
    return {
        type: actions.SET_LOGIN_ERROR,
        payload: { login_error }
    }
}

const loginActions = {
    setLoginPageError
}

export default loginActions
