import axios from 'axios'
import pageActions from '../actions/pageActions'

const updatePageItemImagePreview = url => {
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
            dispatch(pageActions.updatePageItemPreview({ ...resp.data.preview }))
        }).catch(err => {
            console.log(err)
        })
    }
}

export {
    updatePageItemImagePreview
}
