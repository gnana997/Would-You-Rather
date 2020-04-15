import { RECEIVE_USERS, USER_ANSWERED } from "../actions/users";

export default function users(state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return action.users
        case USER_ANSWERED:
            return {
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        default:
            return state
    }
}