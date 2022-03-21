import actions from '../actions/actionLang'

export default function auth(auth = {valid: false, token: '', error: ''}, action) {
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