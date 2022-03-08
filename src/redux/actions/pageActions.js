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

const updatePageItemPreview = pageItemPreview => {
    return {
        type: actions.UPDATE_PAGE_ITEM_PREVIEW,
        payload: { pageItemPreview }
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
    updatePageNumber,
    updatePageItemPreview
}

export default pageActions