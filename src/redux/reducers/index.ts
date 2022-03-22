
import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import viewSavingsGoalPage from './viewSavingsGoalPageReducer'
import addSavingsGoalForm from './addSavingsGoalFormReducer'
import loginPage from './loginPageReducer'
import user from './userReducer'

const rootReducer = combineReducers({
    user,
    auth,
    addSavingsGoalForm,
    loginPage,
    viewSavingsGoalPage,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
