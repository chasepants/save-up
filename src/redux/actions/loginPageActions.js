import actions from './actionLang'

const setLoginPageError = login_error => {
    return {
        type: actions.SET_LOGIN_ERROR,
        payload: { login_error }
    }
}

const loginPageActions = {
    setLoginPageError
}

export default loginPageActions
