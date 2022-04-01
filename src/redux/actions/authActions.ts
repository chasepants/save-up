import actions from './actionLang'

const updateAuthIsValid = (is_valid: boolean) => {
    return {
        type: actions.UPDATE_AUTH_VALID,
        payload: {
            valid: is_valid
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
    clearAuth
}

export default authActions