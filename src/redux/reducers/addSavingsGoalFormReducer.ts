import { Action } from 'redux'
import actions from '../actions/actionLang'

export type AddSavingsGoalItemAction = Action & {payload: AddSavingsGoalItemActionPayload};
export type DefaultAddSavingsGoalItem = {show_form: boolean, add_error: string, remove_error: string};
export type AddSavingsGoalItemActionPayload = Action & DefaultAddSavingsGoalItem;

const defaultItemForm: DefaultAddSavingsGoalItem = {show_form: false, add_error: '', remove_error: ''}

export default function addSavingsGoalFormReducer(itemForm = defaultItemForm, action: AddSavingsGoalItemAction) {
    switch (action.type) {
        case actions.SHOW_ADD_SAVINGS_GOAL_FORM:
            return {
                ...itemForm,
                show_form: true
            }
        case actions.HIDE_ADD_SAVINGS_GOAL_FORM:
            return {
                ...itemForm,
                show_form: false,
                add_error: ''
            }
        case actions.SET_ADD_SAVINGS_GOAL_ERROR:
            return {
                ...itemForm,
                add_error: action.payload.add_error
            }
        case actions.SET_REMOVE_SAVINGS_GOAL_ERROR:
            return {
                ...itemForm,
                remove_error: action.payload.remove_error
            }
        default:
            return itemForm
    }
}
