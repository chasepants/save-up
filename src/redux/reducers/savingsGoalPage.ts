import { createAction, createReducer } from '@reduxjs/toolkit';
import { ItemPreview, SavingsItem } from '../../library/types';

/** TYPES */
interface SavingsGoalPageState { 
    item: SavingsItem;
    item_preview: ItemPreview;
};

/** ACTIONS */
const clearPage = createAction('savingsGoalPage/clearPage')
const updateItem = createAction<SavingsItem>('savingsGoalPage/updateItem')
const updateItemPreview = createAction<ItemPreview>('savingsGoalPage/updateItemPreview')
/** INITIAL STATE */
const initialState: SavingsGoalPageState = { 
    item: {}, 
    item_preview: {}
};

/** REDUCER */
export const savingsGoalPageReducer = createReducer(initialState, builder => {
    builder.addCase(clearPage, (state, action) => { state = initialState })
    builder.addCase(updateItem, (state, action) => { state.item = action.payload })
    builder.addCase(updateItemPreview, (state, action) => { state.item_preview = action.payload })
})
