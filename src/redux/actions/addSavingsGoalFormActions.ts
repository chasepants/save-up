import { SavingsGoalInputErrors, SavingsGoalInputs } from '../reducers/addSavingsGoalFormReducer'
import actions from './actionLang'

const showAddSavingsGoalForm = () => {
    return { type: actions.SHOW_ADD_SAVINGS_GOAL_FORM }
}

const hideAddSavingsGoalForm = () => {
    return { type: actions.HIDE_ADD_SAVINGS_GOAL_FORM }
}

const setAddSavingsGoalFormAddError = add_error => {
    return {
        type: actions.SET_ADD_SAVINGS_GOAL_ERROR,
        payload: { add_error }
    }
}

const setAddSavingsGoalFormRemoveError = remove_error => {
    return {
        type: actions.SET_REMOVE_SAVINGS_GOAL_ERROR,
        payload: { remove_error }
    }
}

const updateSavingsGoalInputs = (savings_goal_inputs: SavingsGoalInputs) => {
    return {
        type: actions.UPDATE_SAVINGS_GOAL_INPUTS,
        payload: { savings_goal_inputs }
    }
}

const updateSavingsGoalInputErrors = (savings_goal_input_errors: SavingsGoalInputErrors) => {
    return {
        type: actions.UPDATE_SAVINGS_GOAL_INPUT_ERRORS,
        payload: { savings_goal_input_errors }
    }
}

const toggleAddSavingsGoalFormIsSaving = () => {
    return {
        type: actions.TOGGLE_ADD_SAVINGS_GOAL_FORM_IS_SAVING
    }
}

const AddSavingsGoalFormActions = {
    showAddSavingsGoalForm,
    hideAddSavingsGoalForm,
    setAddSavingsGoalFormAddError,
    setAddSavingsGoalFormRemoveError,
    updateSavingsGoalInputs,
    updateSavingsGoalInputErrors,
    toggleAddSavingsGoalFormIsSaving
}

export default AddSavingsGoalFormActions
