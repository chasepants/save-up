import actions from './actionLang'

const updateViewSavingsGoalPageNumber = number => {
    return {
        type: actions.UPDATE_PAGE_NUMBER,
        payload: { number }
    }
}

const updateViewSavingsGoalPageItem = item => {
    return {
        type: actions.UPDATE_PAGE_ITEM,
        payload: { item }
    }
}

const updateViewSavingsGoalPagePreview = pageItemPreview => {
    return {
        type: actions.UPDATE_PAGE_ITEM_PREVIEW,
        payload: { pageItemPreview }
    }
}

const updateViewSavingsGoalPage = (item, number) => {
    return {
        type: actions.UPDATE_PAGE,
        payload: { 
            item,
            number
        }
    }
}

const pageActions = {
    updateViewSavingsGoalPageNumber,
    updateViewSavingsGoalPageItem,
    updateViewSavingsGoalPagePreview,
    updateViewSavingsGoalPage
}

export default pageActions