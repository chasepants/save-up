import { PlaidItem, SavingsItem } from '../../library/types'
import { createAction, createReducer } from '@reduxjs/toolkit'

/** TYPES */
export interface UserState {
    _id?: string,
    username: string;
    name: string;
    plaid_items: Array<PlaidItem>;
    savings_items: Array<SavingsItem>;
}

/** ACTIONS */
export const updateUser = createAction<UserState>('user/update');
export const clearUser = createAction('user/clear');

/** INITIAL STATE */
const initalState: UserState = { username: '', name: '', plaid_items: [], savings_items: [] }

/** REDUCER */
export const userReducer = createReducer<UserState>(initalState, builder => {
    builder.addCase(updateUser, (state: UserState, action) => state = action.payload);
    builder.addCase(clearUser, (state: UserState) => state = initalState);
});
