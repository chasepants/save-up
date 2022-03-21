import axios from 'axios'
import viewSavingsGoalPageActions from '../actions/viewSavingsGoalPageActions'

const updateViewSavingsGoalItemImagePreview = url => {
    return (dispatch, getState) => {
        const state = getState()
        const reqBody = {
            url
        }
        console.log(reqBody)
        return axios.post(`http://localhost:8081/get_preview`, reqBody, {
            headers: {
                'authorization': state.auth.token
            } 
        }).then(resp => {
            dispatch(viewSavingsGoalPageActions.updateViewSavingsGoalItemImagePreview({ ...resp.data.preview }))
        }).catch(err => {
            console.log(err)
        })
    }
}

export {
    updateViewSavingsGoalItemImagePreview
}
