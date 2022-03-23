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

const AddSavingsGoalFormActions = {
    showAddSavingsGoalForm,
    hideAddSavingsGoalForm,
    setAddSavingsGoalFormAddError,
    setAddSavingsGoalFormRemoveError
}

export default AddSavingsGoalFormActions
