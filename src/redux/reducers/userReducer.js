import actions from '../actions/actionLang'

export default function userReducer(user = { username: '', name: '', plaid_items: [], savings_items: []}, action) {
    switch (action.type) {
        case actions.UPDATE_USER:
            return {
                ...action.payload.user
            }
        default:
            return user
    }
}