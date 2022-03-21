import actions from '../actions/actionLang'

export default function viewSavingsGoalPageReducer(viewSavingsGoalPage = {}, action) {
    switch (action.type) {
        case actions.UPDATE_PAGE_ITEM_PREVIEW:
            return {
                ...viewSavingsGoalPage,
                item_preview: action.payload.pageItemPreview
            }
        case actions.UPDATE_PAGE_ITEM:
            return {
                ...viewSavingsGoalPage,
                item: action.payload.item
            }
        case actions.UPDATE_PAGE:
            return {
                item: action.payload.item,
            }
      default:
        return viewSavingsGoalPage
    }
}