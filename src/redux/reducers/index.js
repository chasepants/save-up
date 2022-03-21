
import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import viewSavingsGoalPage from './viewSavingsGoalPageReducer'
import addSavingsGoalForm from './addSavingsGoalFormReducer'
import loginPage from './loginPageReducer'
import user from './userReducer'

export default combineReducers({
    user,
    auth,
    addSavingsGoalForm,
    loginPage,
    viewSavingsGoalPage,
})
