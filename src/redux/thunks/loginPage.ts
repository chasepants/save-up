import axios, { AxiosResponse } from 'axios'
import { Dispatch } from 'redux'
import viewSavingsGoalPageActions from '../actions/viewSavingsGoalPageActions'
import { RootState } from '../reducers'

const updateViewSavingsGoalItemImagePreview = (url: string) => {
    return async (dispatch: Dispatch, getState: any) => {
        const state: RootState = getState()
        const reqBody = {
            url
        }

        try {
            const resp: AxiosResponse = await axios.post(`http://localhost:8081/get_preview`, reqBody, {
                headers: {
                    'authorization': state.auth.token
                }
            })
            dispatch(viewSavingsGoalPageActions.updateViewSavingsGoalPagePreview({ ...resp.data.preview }))
        } catch (err) {
            console.log(err)
        }
    }
}

export {
    updateViewSavingsGoalItemImagePreview
}
