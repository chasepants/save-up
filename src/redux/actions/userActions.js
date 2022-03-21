import actions from './actionLang'

const updateUser = (user) => {
    return {
        type: actions.UPDATE_USER,
        payload: { user }
    }
}

const clearUser = () => {
    return {
        type: actions.CLEAR_USER
    }
}

const userActions = {
    updateUser,
    clearUser
}

export default userActions