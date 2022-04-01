import actions from './actionLang'

const updateViewSavingsGoalPageItem = item => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM,
        payload: { item }
    }
}

const updateViewSavingsGoalPagePreview = pageItemPreview => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE_ITEM_PREVIEW,
        payload: { item_preview: pageItemPreview }
    }
}

const updateViewSavingsGoalPage = (item, number) => {
    return {
        type: actions.UPDATE_VIEW_SAVINGS_GOAL_PAGE,
        payload: { 
            item,
            number
        }
    }
}

const pageActions = {
    updateViewSavingsGoalPageItem,
    updateViewSavingsGoalPagePreview,
    updateViewSavingsGoalPage
}

export default pageActions