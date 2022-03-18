import { validateItem } from '../../utils/validate'
import itemFormActions from '../actions/itemFormActions'
import authActions from '../actions/authActions'
import loginActions from '../actions/loginActions'

function updateUserPlaidItems(plaidItem) {
    return async (dispatch, getState, usersApi) => {
        const state = getState()
        const user = state.auth.user

        let updated_user = {
            ...user,
            plaid_items: [
                ...user.plaid_items,
                plaidItem
            ]
        }
        
        try {
            const response = await usersApi.updateUser(user._id, updated_user, state.auth.token);
            localStorage.removeItem('state')
            dispatch(authActions.updateAuthUser(response.data.user))
        } catch (error) {
            console.log(error)
            // todo: dispatch error
        }
    }
}

function updateUserItems(item) {
    return async (dispatch, getState, usersApi) => {
        let is_validated = validateItem(item)

        if (!is_validated) {
            return () => dispatch(itemFormActions.setAddError('Please fill out correct form'))
        }

        const state = getState()
        const user = state.auth.user

        let updated_user = {
            ...user,
            items: [
                ...user.items,
                item
            ]
        }

        try {
            const response = await usersApi.updateUser(user._id, updated_user, state.auth.token);
            localStorage.removeItem('state')
            dispatch(authActions.updateAuthUser(response.data.user))
            dispatch(itemFormActions.hideItemForm())
        } catch (error) {
            dispatch(itemFormActions.setItemFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function removeUserItem(delete_item) {
    return async (dispatch, getState, usersApi) => {
        const state = getState()
        const user = state.auth.user

        let index;
        let updated_items = user.items.map((item, i) => {
            if (item !== delete_item)
                return item 
            index = i
            return '';
        })

        updated_items.splice(index, 1);

        let updated_user = {
            ...user,
            items: updated_items
        }

        try {
            const response = await usersApi.updateUser(user._id, updated_user, state.auth.token)
            dispatch(authActions.updateAuthUser(response.data.user))
        } catch (error) {
            dispatch(itemFormActions.setItemFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function login(username, password) {
    return async (dispatch, getState, usersApi) => {
        try {
            const response = await usersApi.login(username, password);
            localStorage.setItem('auth', response.data.auth)
            dispatch(authActions.updateAuth(response.data.auth, response.data.user))
        } catch (error) {
            if (error.response.status === 400) {
                console.log('how do we get here')
                dispatch(loginActions.setLoginPageError('Incorrect password'))
            } else {
                dispatch(loginActions.setLoginPageError('Something went wrong, please try again'))
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        }
    }
}

function signup(user) {
    return async (dispatch, getState, usersApi) => {
        try {
            const response = await usersApi.signup(user);
            localStorage.setItem('auth', response.data.auth)
            dispatch(authActions.updateAuth(response.data.auth, response.data.user))
        } catch (error) {
            if (error.response.status === 403) {
                dispatch(loginActions.setLoginPageError('Username taken'))
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        }
    }
}

const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('state')
        dispatch(authActions.clearAuth())
        dispatch(loginActions.setLoginPageError(''))
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
