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

const updateAuthError = (error) => {
    return {
        type: actions.UPDATE_AUTH_ERROR,
        payload: { error }
    }
}

const updateAuthUser = (user) => {
    return {
        type: actions.UPDATE_AUTH_USER,
        payload: { user }
    }
}

const updateAuth = (token, user) => {
    return {
        type: actions.UPDATE_AUTH,
        payload: { 
            token: token,
            user: user
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
    updateAuthError,
    updateAuthUser,
    updateAuth,
    clearAuth
}

export default authActions