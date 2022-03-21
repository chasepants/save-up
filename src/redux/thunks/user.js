import addSavingsGoalFormActions from '../actions/addSavingsGoalFormActions'
import authActions from '../actions/authActions'
import loginPageActions from '../actions/loginPageActions'
import userActions from '../actions/userActions'

function updateUserPlaidItems(plaidItem) {
    return async (dispatch, getState, usersApi) => {
        const state = getState()
        const user = state.user

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
            dispatch(userActions.updateUser(response.data.user))
        } catch (error) {
            console.log(error)
            // todo: dispatch error
        }
    }
}

function updateUserItems(item) {
    return async (dispatch, getState, usersApi) => {
        const state = getState()
        const user = state.user

        let updated_user = {
            ...user,
            savings_items: [
                ...user.savings_items,
                item
            ]
        }

        try {
            const response = await usersApi.updateUser(user._id, updated_user, state.auth.token);
            localStorage.removeItem('state')
            dispatch(userActions.updateUser(response.data.user))
            dispatch(addSavingsGoalFormActions.hideAddSavingsGoalForm())
        } catch (error) {
            dispatch(addSavingsGoalFormActions.setAddSavingsGoalFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function removeUserItem(delete_item) {
    return async (dispatch, getState, usersApi) => {
        const state = getState()
        const user = state.user

        let index;
        let updated_items = user.savings_items.map((item, i) => {
            if (item !== delete_item)
                return item 
            index = i
            return '';
        })

        updated_items.splice(index, 1);

        let updated_user = {
            ...user,
            savings_items: updated_items
        }

        try {
            const response = await usersApi.updateUser(user._id, updated_user, state.auth.token)
            dispatch(userActions.updateUser(response.data.user))
        } catch (error) {
            dispatch(addSavingsGoalFormActions.setItemFormAddError('NETWORK ERROR: Could not add item at this time'))
        }
    }
}

function login(username, password) {
    return async (dispatch, getState, usersApi) => {
        try {
            const response = await usersApi.login(username, password);
            console.log(response)
            localStorage.setItem('auth', response.data.auth)
            dispatch(authActions.updateAuth(true))
            dispatch(userActions.updateUser(response.data.user))
        } catch (error) {
            console.log(error)
            if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status === 400) {
                console.log('how do we get here')
                dispatch(loginPageActions.setLoginPageError('Incorrect password'))
            } else {
                dispatch(loginPageActions.setLoginPageError('Something went wrong, please try again'))
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
            dispatch(authActions.updateAuth(response.data.auth))
            dispatch(userActions.updateUser(response.data.user))
        } catch (error) {
            if (error.hasOwnProperty('response') && error.response.hasOwnProperty('status') && error.response.status === 403) {
                dispatch(loginPageActions.setLoginPageError('Username taken'))
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
