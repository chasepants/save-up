import addSavingsGoalFormActions from '../actions/addSavingsGoalFormActions'
import authActions from '../actions/authActions'
import loginPageActions from '../actions/loginPageActions'
import userActions from '../actions/userActions'
import { PlaidItem, SavingsItem, User } from '../../library/types'
import { Dispatch } from 'redux'
import { RootState } from '../reducers'
import { LoginInputs, SignupInputs } from '../reducers/loginPageReducer'
import UsersService from '../../library/usersService'

function updateUserPlaidItems(item: PlaidItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: User = state.user
        
        try {
            let updatedUser = await usersService.addUserPlaidItem((user._id as string), item);
            updatedUser._id = user._id
            localStorage.removeItem('state')
            dispatch(userActions.updateUser(updatedUser))
        } catch (error: any) {
            console.log(error)
        }
    }
}

function updateUserItems(item: SavingsItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: User = state.user
        try {
            await usersService.addUserSavingsItem((user._id as string), item);
            
            localStorage.removeItem('state')
            user.savings_items.push(item)
            dispatch(userActions.updateUser(user))
            dispatch(addSavingsGoalFormActions.hideAddSavingsGoalForm())
        } catch (error: any) {
            dispatch(addSavingsGoalFormActions.setAddSavingsGoalFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function removeUserItem(item: SavingsItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: User = state.user

        try {
            let updatedUser = await usersService.removeUserSavingsItems((user._id as string), item)

            updatedUser._id = user._id; 
            dispatch(userActions.updateUser(updatedUser));
        } catch (error: any) {
            dispatch(addSavingsGoalFormActions.setAddSavingsGoalFormRemoveError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function login(user: LoginInputs) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        try {
            const loggedInUser: User = await usersService.login((user.username as string), (user.password as string));
            dispatch(authActions.updateAuthIsValid(true))
            dispatch(userActions.updateUser(loggedInUser))
        } catch (error: any) {
            dispatch(loginPageActions.setLoginPageError(error.message))
            dispatch(authActions.clearAuth())
        }
    }
}

function signup(signupUser: SignupInputs) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        try {
            const name = `${signupUser.firstname} ${signupUser.lastname}`;
            const user: User = await usersService.signup((signupUser.username as string), (signupUser.password as string), name);
            dispatch(authActions.updateAuthIsValid(true))
            dispatch(userActions.updateUser(user))
        } catch (error: any) {
            dispatch(loginPageActions.setLoginPageError(error))
            dispatch(authActions.clearAuth())
        }
    }
}

const logout = () => {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        await usersService.logout()
        localStorage.removeItem('state')
        dispatch(authActions.clearAuth())
        dispatch(userActions.clearUser())
        dispatch(loginPageActions.setLoginPageError(''))
    }
}

export {
    login, 
    logout,
    signup,
    updateUserItems,
    removeUserItem,
    updateUserPlaidItems
}
