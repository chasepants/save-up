import { createSlice } from '@reduxjs/toolkit';
import { ItemPreview, SavingsItem } from '../../library/types';

/** TYPES */
interface SavingsGoalPageState { 
    item: SavingsItem;
    item_preview: ItemPreview;
};

/** INITIAL STATE */
const initialState: SavingsGoalPageState = { 
    item: {}, 
    item_preview: {}
};

/** REDUCER */
const savingsGoalPageSlice = createSlice({
    name: 'savingsGoalPage',
    initialState: initialState,
    reducers: {
        clearPage: state => state = initialState,
        updateItem: (state, action) => { state.item = action.payload },
        updateItemPreview: (state, action) => { state.item_preview = action.payload }
    }
})

export default savingsGoalPageSlice.reducer;
