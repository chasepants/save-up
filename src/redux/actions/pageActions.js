import actions from './actionLang'

const updatePageNumber = number => {
    return {
        type: actions.UPDATE_PAGE_NUMBER,
        payload: { number }
    }
}

const updatePageItem = item => {
    return {
        type: actions.UPDATE_PAGE_ITEM,
        payload: { item }
    }
}

const updatePage = (item, number) => {
    return {
        type: actions.UPDATE_PAGE,
        payload: { 
            item,
            number
        }
    }
}

const pageActions = {
    updatePage,
    updatePageItem,
    updatePageNumber
}

export default pageActions