import actions from './actionLang'

const showAddSavingsGoalForm = () => {
    return { type: actions.SHOW_ITEM_FORM }
}

const hideAddSavingsGoalForm = () => {
    return { type: actions.HIDE_ITEM_FORM }
}

const setAddSavingsGoalFormAddError = add_error => {
    return {
        type: actions.SET_ADD_ERROR,
        payload: { add_error }
    }
}

const setAddSavingsGoalFormRemoveError = remove_error => {
    return {
        type: actions.SET_REMOVE_ERROR,
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
