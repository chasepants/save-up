import actions from './actionLang'

const updateAuthIsValid = (is_valid) => {
    return {
        type: actions.UPDATE_AUTH_VALID,
        payload: {
            valid: is_valid
        }
    }
}

const updateAuthToken = (token) => {
    return {
        type: actions.UPDATE_AUTH_TOKEN,
        payload: { token }
    }
}

const updateAuth = (token: string) => {
    return {
        type: actions.UPDATE_AUTH,
        payload: { 
            token: token
        }
    }
}

const clearAuth = () => {
    return {
        type: actions.CLEAR_AUTH
    }
}

const authActions = {
    updateAuthIsValid,
    updateAuthToken,
    updateAuth,
    clearAuth
}

export default authActions