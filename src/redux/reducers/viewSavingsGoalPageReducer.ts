import { Action } from 'redux';
import { ItemPreview, SavingsItem } from '../../utils/types';
import actions from '../actions/actionLang'

export type ViewSavingsGoalPageAction = Action & {payload: ViewSavingsGoalPageActionPayload};
export type DefaultViewSavingsGoalPage = { item: SavingsItem, item_preview: ItemPreview };
export type ViewSavingsGoalPageActionPayload = Action & DefaultViewSavingsGoalPage;

const defaultSavingsGoalPage = { item: {}, item_preview: {} };

export default function viewSavingsGoalPageReducer(viewSavingsGoalPage = defaultSavingsGoalPage, action: ViewSavingsGoalPageAction) {
    switch (action.type) {
        case actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM_PREVIEW:
            return {
                ...viewSavingsGoalPage,
                item_preview: action.payload.item_preview
            }
        case actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM:
            return {
                ...viewSavingsGoalPage,
                item: action.payload.item
            }
        case actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE:
            return {
                item: action.payload.item,
            }
      default:
        return viewSavingsGoalPage
    }
}
