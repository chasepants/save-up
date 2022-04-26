import { createAction, createSlice } from '@reduxjs/toolkit'
import { SavingsGoalInputs, SavingsGoalInputErrors } from '../../library/types'
import { updateUserItemsThunk } from '../thunks/user';

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

export const savingsGoalFormSlice = createSlice({
    name: 'savingsGoalFormSlice',
    initialState: initialState,
    reducers: {
        showForm: (state: SavingsGoalFormState) => { state.show_form = true },
        hideForm: (state: SavingsGoalFormState) => state = initialState,
        clearForm: (state: SavingsGoalFormState) => state = initialState,
        updateFormInputs: (state: SavingsGoalFormState, action) => { state.savings_goal_inputs = action.payload },
        toggleFormIsSaving: (state: SavingsGoalFormState) => { state.isSaving = !state.isSaving },
        setAddGoalFormError: (state: SavingsGoalFormState, action) => { state.add_error = action.payload },
        updateFormInputErrors: (state: SavingsGoalFormState, action) => { state.savings_goal_input_errors = action.payload },
        setRemoveGoalFormError: (state: SavingsGoalFormState, action) => { state.remove_error = action.payload }
    },
    extraReducers: builder => {
        builder.addCase(updateUserItemsThunk.fulfilled, (state: SavingsGoalFormState) => state = initialState)
        builder.addCase(updateUserItemsThunk.rejected, (state: SavingsGoalFormState) => { 
            state.add_error = 'Item could not be added at this time. If problem persists please contact support'
        })
    }
})

export default savingsGoalFormSlice.reducer;
