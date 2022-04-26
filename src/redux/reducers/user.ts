import { PlaidItem, SavingsItem } from '../../library/types'
import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, logoutThunk, removeUserItemThunk, signupThunk, updateUserItemsThunk, updateUserPlaidItemsThunk } from '../thunks/user'

/** TYPES */
export interface UserState {
    _id?: string,
    username: string;
    name: string;
    plaid_items: Array<PlaidItem>;
    savings_items: Array<SavingsItem>;
}

/** INITIAL STATE */
const initalState: UserState = { username: '', name: '', plaid_items: [], savings_items: [] }

/** REDUCER */
const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {
        update: (state: UserState, action) => state = action.payload,
        clear: (state: UserState) => state = initalState
    }, 
    extraReducers: (builder) => {
        /** ADD PLAID ITEM */
        builder.addCase(updateUserPlaidItemsThunk.fulfilled, (state, action) => state = action.payload);
        // builder.addCase(updateUserPlaidItemsThunk.rejected, () => console.log('error'))
        /** ADD SAVINGS ITEM */
        builder.addCase(updateUserItemsThunk.fulfilled, (state, action) => state = action.payload);
        /** REMOVE SAVINGS ITEM */
        builder.addCase(removeUserItemThunk.fulfilled, (state, action) => state = action.payload);
        /** LOGIN */
        builder.addCase(loginThunk.fulfilled, (state, action) => state = action.payload);
        /** SIGNUP */
        builder.addCase(signupThunk.fulfilled, (state, action) => state = action.payload);
        /** LOGOUT */
        builder.addCase(logoutThunk.rejected, state => state = initalState);
        builder.addCase(logoutThunk.fulfilled, state => state = initalState);
    },
})

export default userSlice.reducer
