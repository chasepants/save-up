import actions from '../actions/actionLang'
import { DefaultAddSavingsGoalItem, AddSavingsGoalItemAction } from '../types/addSavingsGoalFormTypes'

const defaultItemForm: DefaultAddSavingsGoalItem = {
    show_form: false,
    savings_goal_inputs: {},
    savings_goal_input_errors: {},
    add_error: '',
    remove_error: '',
    isSaving: false
}

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
                add_error: '',
                savings_goal_inputs: {},
                savings_goal_input_errors: {}
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
        case actions.UPDATE_SAVINGS_GOAL_INPUTS:
            return {
                ...itemForm,
                savings_goal_inputs: action.payload.savings_goal_inputs
            }
        case actions.UPDATE_SAVINGS_GOAL_INPUT_ERRORS:
            return {
                ...itemForm,
                savings_goal_input_errors: action.payload.savings_goal_input_errors
            }
        case actions.TOGGLE_ADD_SAVINGS_GOAL_FORM_IS_SAVING:
            return {
                ...itemForm,
                isSaving: !itemForm.isSaving
            }
        default:
            return itemForm
    }
}
