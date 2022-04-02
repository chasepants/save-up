import { SavingsItem } from '../../library/types'
import actions from './actionLang'

const updateViewSavingsGoalPageItem = (item: SavingsItem) => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM,
        payload: { item }
    }
}

const updateViewSavingsGoalPagePreview = (pageItemPreview: any) => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM_PREVIEW,
        payload: { item_preview: pageItemPreview }
    }
}

const updateViewSavingsGoalPage = (item: SavingsItem) => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE,
        payload: { 
            item
        }
    }
}

const pageActions = {
    updateViewSavingsGoalPageItem,
    updateViewSavingsGoalPagePreview,
    updateViewSavingsGoalPage
}

export default pageActions