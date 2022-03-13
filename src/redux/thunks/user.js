import axios from 'axios'
import { validateItem } from '../../utils/validate'
import itemFormActions from '../actions/itemFormActions'
import authActions from '../actions/authActions'
import loginActions from '../actions/loginActions'

const updateUserPlaidItems = (plaidItem) => {
    return (dispatch, getState) => {
        const state = getState()
        const user = state.auth.user

        let updated_user = {
            ...user,
            plaid_items: [
                ...user.plaid_items,
                plaidItem
            ]
        }
        localStorage.removeItem('state')
        return axios.post(`http://localhost:8081/update/${user._id}`, updated_user, {
            headers: {
                'authorization': state.auth.token
            } 
        }).then(resp => {
            dispatch(authActions.updateAuthUser(resp.data.user))
        }).catch(err => {
            console.log(err)
        })
    }
}

const updateUserItems = (item) => {
    return (dispatch, getState) => {
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
        // @TODO: api calls should probably be put in their own file
        return axios.post(`http://localhost:8081/update/${user._id}`, updated_user, {
            headers: {
                'authorization': state.auth.token
            } 
        }).then(resp => {
            localStorage.removeItem('state')
            dispatch(authActions.updateAuthUser(resp.data.user))
            dispatch(itemFormActions.hideItemForm())
        }).catch(err => {
            dispatch(itemFormActions.setAddError('Could not add item to DB'))
        })
    }
}

const removeUserItem = (delete_item) => {
    return (dispatch, getState) => {
        const state = getState()
        const user = state.auth.user
        console.log(user)

        let index;
        let updated_items = user.items.map((item, i) => {
            console.log(item, i)
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

        return axios.post(`http://localhost:8081/update/${user._id}`, updated_user, {
            headers: {
                'authorization': state.auth.token
            } 
        }).then(resp => {
            dispatch(authActions.updateAuthUser(resp.data.user))
        }).catch(err => {
            dispatch(itemFormActions.setItemFormRemoveError('Could not add item to DB'))
        })
    }
}

const login = (username, password) => {
    return (dispatch) => {
        return axios.get(`http://localhost:8081/login/${username}/${password}`).then(res => {
            localStorage.setItem('auth', res.data.auth)

            const action = authActions.updateAuth(res.data.auth, res.data.user)

            dispatch(action)
        }).catch(error => {
            // Check if it's HTTP 400  error
            if (error.response.status === 400) {
                dispatch(authActions.clearAuth());
                dispatch(loginActions.setLoginPageError('Incorrect password'))
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        })
    }
}

const signup = (username, password) => {
    return (dispatch) => {
        return axios.get(`http://localhost:8081/signup/${username}/${password}`).then(res => {
            console.log("success")
            console.log(res)
            localStorage.setItem('auth', res.data.auth)
            dispatch(authActions.updateAuth(res.data.auth, res.data.user))
        }).catch(error => {
            console.log(error.response);

            // Check if it's HTTP 400  error
            if (error.response.status === 400) {
                console.log(`HTTP 400 error occured`);
            }
            // You can get response data (mostly the reason would be in it)
            if (error.response.data) {
                console.log(error.response.data);
            }

            localStorage.removeItem('auth')
            dispatch(authActions.clearAuth())
        })
    }
}

const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('state')
        dispatch(authActions.clearAuth())
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
