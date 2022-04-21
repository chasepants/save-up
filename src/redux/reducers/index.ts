
import { combineReducers } from '@reduxjs/toolkit'
import { authReducer as auth } from './auth'
import { savingsGoalPageReducer as savingsGoalPage } from './savingsGoalPage'
import { savingsGoalFormReducer as savingsGoalForm } from './savingsGoalForm'
import { loginReducer as login } from './login'
import { userReducer as user } from './user'

const rootReducer = combineReducers({
    user,
    auth,
    login,
    savingsGoalForm,
    savingsGoalPage,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
