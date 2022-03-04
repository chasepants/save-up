
import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import page from './pageReducer'
import itemForm from './itemFormReducer'

export default combineReducers({
    auth,
    page,
    itemForm
})