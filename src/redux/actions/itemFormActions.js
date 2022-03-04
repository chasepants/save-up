import actions from './actionLang'

const showItemForm = () => {
    return { type: actions.SHOW_ITEM_FORM }
}

const hideItemForm = () => {
    return { type: actions.HIDE_ITEM_FORM }
}

const setItemFormAddError = add_error => {
    return {
        type: actions.SET_ADD_ERROR,
        payload: { add_error }
    }
}

const setItemFormRemoveError = remove_error => {
    return {
        type: actions.SET_REMOVE_ERROR,
        payload: { remove_error }
    }
}

const itemFormActions = {
    showItemForm,
    hideItemForm,
    setItemFormAddError,
    setItemFormRemoveError
}

export default itemFormActions
