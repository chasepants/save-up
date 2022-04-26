
import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import savingsGoalPage from './savingsGoalPage'
import savingsGoalForm from './savingsGoalForm'
import login from './login'
import user from './user'

const rootReducer = combineReducers({
    user,
    auth,
    login,
    savingsGoalForm,
    savingsGoalPage,
});

export default rootReducer;
