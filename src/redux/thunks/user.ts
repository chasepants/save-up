import addSavingsGoalFormActions from '../actions/addSavingsGoalFormActions'
import authActions from '../actions/authActions'
import loginPageActions from '../actions/loginPageActions'
import userActions from '../actions/userActions'
import { PlaidItem, SavingsItem, User } from '../../utils/types'
import { Dispatch } from 'redux'
import UsersApi from '../../api/usersApi'
import { RootState } from '../reducers'
import { AxiosResponse } from 'axios'
import { LoginInputs } from '../reducers/loginPageReducer'

function updateUserPlaidItems(plaidItem: PlaidItem) {
    return async (dispatch: Dispatch, getState: any, usersApi: UsersApi) => {
        const state: RootState = getState()
        const user: User = state.user

        let updated_user: User = {
            ...user,
            plaid_items: [
                ...user.plaid_items,
                plaidItem
            ]
        }
        
        try {
            const response: AxiosResponse = await usersApi.updateUser((user as any)._id, updated_user, state.auth.token);
            localStorage.removeItem('state')
            dispatch(userActions.updateUser(response.data.user))
        } catch (error: any) {
            console.log(error)
            // todo: dispatch error
        }
    }
}

function updateUserItems(item: any) {
    return async (dispatch: Dispatch, getState: any, usersApi: UsersApi) => {
        const state: RootState = getState()
        const user: User = state.user

        let updated_user: User = {
            ...user,
            savings_items: [
                ...user.savings_items,
                item
            ]
        }

        try {
            const response: AxiosResponse = await usersApi.updateUser((user as any)._id, updated_user, state.auth.token);
            localStorage.removeItem('state')
            dispatch(userActions.updateUser(response.data.user))
            dispatch(addSavingsGoalFormActions.hideAddSavingsGoalForm())
        } catch (error: any) {
            dispatch(addSavingsGoalFormActions.setAddSavingsGoalFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function removeUserItem(delete_item: SavingsItem) {
    return async (dispatch: Dispatch, getState: any, usersApi: UsersApi) => {
        const state: RootState = getState()
        const user: User = state.user

        let index: number;
        let updated_items = user.savings_items.map((item: SavingsItem, i: number) => {
            if (item !== delete_item)
                return item 
            index = i
            return '';
        })

        updated_items.splice(index, 1);

        let updated_user: User = {
            ...user,
            savings_items: (updated_items as Array<SavingsItem>)
        }

        try {
            const response: AxiosResponse = await usersApi.updateUser((user as any)._id, updated_user, state.auth.token)
            dispatch(userActions.updateUser(response.data.user))
        } catch (error: any) {
            dispatch(addSavingsGoalFormActions.setItemFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function login(user: LoginInputs) {
    return async (dispatch: Dispatch, getState: any, usersApi: UsersApi) => {
        try {
            const response: AxiosResponse = await usersApi.login(user.username, user.password);
            localStorage.setItem('auth', response.data.auth)
            dispatch(authActions.updateAuth(true))
            dispatch(userActions.updateUser(response.data.user))
        } catch (error: any) {
            if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status === 400) {
                dispatch(loginPageActions.setLoginPageError('Incorrect password'))
            } else {
                dispatch(loginPageActions.setLoginPageError('Something went wrong, please try again'))
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        }
    }
}

function signup(user: any) {
    return async (dispatch: Dispatch, getState: any, usersApi: UsersApi) => {
        try {
            const response = await usersApi.signup(user);
            localStorage.setItem('auth', response.data.auth)
            dispatch(authActions.updateAuth(response.data.auth))
            dispatch(userActions.updateUser(response.data.user))
        } catch (error: any) {
            if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status === 403) {
                dispatch(loginPageActions.setLoginPageError('Username taken'))
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        }
    }
}

const logout = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem('auth')
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
