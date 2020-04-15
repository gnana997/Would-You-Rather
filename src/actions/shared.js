import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions'
import { receiveUsers } from "./users";
import { setAuthedId } from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_USER = 'sarahedo'

export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({users,questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedId(AUTHED_USER))
            dispatch(hideLoading())
        })
    }
}