import { PlaidItem, SavingsItem, User } from '../../library/types'
import { updateUser, clearUser, UserState } from '../reducers/user'
import { updatePageError } from '../reducers/login'
import { clearAuth, updateIsValid } from '../reducers/auth'
import { Dispatch } from 'redux'
import { RootState } from '../store'
import { LoginInputs, SignupInputs } from '../../library/types'
import UsersService from '../../library/usersService'
import { clearForm, hideForm, setAddGoalFormError, setRemoveGoalFormError } from '../reducers/savingsGoalForm'

function updateUserPlaidItems(item: PlaidItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: UserState = state.user 
        
        try {
            let updatedUser = await usersService.addUserPlaidItem((user._id as string), item);
            updatedUser._id = user._id
            localStorage.removeItem('state')
            dispatch(updateUser(updatedUser))
        } catch (error: any) {
            console.log(error)
        }
    }
}

function updateUserItems(item: SavingsItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: UserState = state.user
        
        try {
            const updatedUser = await usersService.addUserSavingsItem((user._id as string), item);
            localStorage.removeItem('state')
            dispatch(updateUser(updatedUser))
            dispatch(hideForm())
        } catch (error: any) {
            console.log(error)
            dispatch(setAddGoalFormError('Item could not be added at this time. If problem persists please contact support'))
        }
    }
}

function removeUserItem(item: SavingsItem) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        const state: RootState = getState()
        const user: UserState = state.user

        try {
            let updatedUser = await usersService.removeUserSavingsItems((user._id as string), item)

            updatedUser._id = user._id; 
            dispatch(updateUser(updatedUser));
        } catch (error: any) {
            dispatch(setRemoveGoalFormError('Could not remove item at this time. If problem persists please contact support.'))
        }
    }
}

function login(user: LoginInputs) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        try {
            const loggedInUser: User = await usersService.login((user.username as string), (user.password as string));
            dispatch(updateIsValid(true))
            dispatch(updateUser(loggedInUser))
        } catch (error: any) {
            dispatch(updatePageError(error.message))
            dispatch(clearAuth())
        }
    }
}

function signup(signupUser: SignupInputs) {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        try {
            const name = `${signupUser.firstname} ${signupUser.lastname}`;
            const user: User = await usersService.signup((signupUser.username as string), (signupUser.password as string), name);
            dispatch(updateIsValid(true))
            dispatch(updateUser(user))
        } catch (error: any) {
            dispatch(updatePageError(error))
            dispatch(clearAuth())
        }
    }
}

const logout = () => {
    return async (dispatch: Dispatch, getState: any, usersService: UsersService) => {
        await usersService.logout()
        localStorage.removeItem('state')
        dispatch(clearAuth())
        dispatch(clearUser())
        dispatch(clearForm())
        dispatch(updatePageError(''))
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
