import { createAction, createReducer } from '@reduxjs/toolkit'
import { SavingsGoalInputs, SavingsGoalInputErrors } from '../../library/types'

/** TYPES */
interface SavingsGoalFormState {
    show_form: boolean;
    savings_goal_inputs: SavingsGoalInputs;
    savings_goal_input_errors: SavingsGoalInputErrors;
    add_error: string;
    remove_error: string;
    isSaving: boolean;
}

/** ACTIONS */
export const showForm  = createAction('savingsGoal/showForm')
export const hideForm  = createAction('savingsGoal/hideForm')
export const clearForm = createAction('savingsGoal/clearForm')
export const updateFormInputs       = createAction<SavingsGoalInputs>('savingsGoal/updateFormInputs')
export const toggleFormIsSaving     = createAction('savingsGoal/toggleFromIsSaving')
export const setAddGoalFormError    = createAction<string>('savingsGoal/setAddGoalFormError')
export const updateFormInputErrors  = createAction<SavingsGoalInputs>('savingsGoal/updateFormInputErrors')
export const setRemoveGoalFormError = createAction<string>('savingsGoal/setRemoveGoalFormError')

/** INITIAL STATE */
const initialState: SavingsGoalFormState = {
    show_form: false,
    savings_goal_inputs: {},
    savings_goal_input_errors: {},
    add_error: '',
    remove_error: '',
    isSaving: false
}

/** REDUCER */
export const savingsGoalFormReducer = createReducer(initialState, builder => {
    builder.addCase(showForm, (state: SavingsGoalFormState) => { state.show_form = true })
    builder.addCase(hideForm, (state: SavingsGoalFormState) => state = initialState)
    builder.addCase(clearForm, (state: SavingsGoalFormState) => state = initialState)
    builder.addCase(updateFormInputs, (state: SavingsGoalFormState, action) => { state.savings_goal_inputs = action.payload })
    builder.addCase(toggleFormIsSaving, (state: SavingsGoalFormState) => { state.isSaving = !state.isSaving })
    builder.addCase(setAddGoalFormError, (state: SavingsGoalFormState, action) => { state.add_error = action.payload })
    builder.addCase(updateFormInputErrors, (state: SavingsGoalFormState, action) => { state.savings_goal_input_errors = action.payload })
    builder.addCase(setRemoveGoalFormError, (state: SavingsGoalFormState, action) => { state.remove_error = action.payload })
})
