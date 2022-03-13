
import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import page from './pageReducer'
import itemForm from './itemFormReducer'
import login from './loginReducer'

export default combineReducers({
    auth,
    itemForm,
    login,
    page
})