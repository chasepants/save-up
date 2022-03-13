import actions from '../actions/actionLang'

export default function auth(auth = {}, action) {
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
        case actions.UPDATE_AUTH_USER:
            return {
                ...auth,
                user: action.payload.user
            }
        case actions.UPDATE_AUTH:
            return {
                valid: true,
                token: action.payload.token,
                error: "",
                user: action.payload.user
            }
        case actions.CLEAR_AUTH:
            return {
                valid: false,
                token: "",
                error: "",
                user: {
                    username: "",
                    password: "",
                    items: [],
                    _id: ""
                }
            }
        default:
            return auth
    }
}