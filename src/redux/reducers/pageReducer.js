import actions from '../actions/actionLang'

export default function page(page = {}, action) {
    switch (action.type) {
        case actions.UPDATE_PAGE_NUMBER:
            return {
                ...page,
                number: action.payload.number
            }
        case actions.UPDATE_PAGE_ITEM:
            return {
                ...page,
                item: action.payload.item
            }
        case actions.UPDATE_PAGE:
            return {
                item: action.payload.item,
                number: action.payload.number
            }
      default:
        return page
    }
}