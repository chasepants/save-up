import actions from '../actions/actionLang'

const defaultItemForm = {show_form: false, add_error: '', remove_error: ''}

export default function itemForm(itemForm = defaultItemForm, action) {
    switch (action.type) {
        case actions.SHOW_ITEM_FORM:
            return {
                ...itemForm,
                show_form: true
            }
        case actions.HIDE_ITEM_FORM:
            return {
                ...itemForm,
                show_form: false,
                add_error: ''
            }
        case actions.SET_ADD_ERROR:
            return {
                ...itemForm,
                add_error: action.payload.add_error
            }
        case actions.SET_REMOVE_ERROR:
            return {
                ...itemForm,
                remove_error: action.payload.remove_error
            }
        default:
            return itemForm
    }
}
