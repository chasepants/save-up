import actions from '../actions/actionLang'
import { User } from '../../library/types'
import { Action } from 'redux';

export type UserAction = Action & {payload: UserActionPayload};
export type DefaultUser = {show_form: boolean, add_error: string, remove_error: string};
export type UserActionPayload = Action & { user: User };

const defaultUser: User = { username: '', name: '', plaid_items: [], savings_items: []}

export default function userReducer(user = defaultUser, action: UserAction) {
    switch (action.type) {
        case actions.UPDATE_USER:
            return {
                ...action.payload.user
            }
        default:
            return user
    }
}