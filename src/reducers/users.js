import { RECEIVE_USERS, USER_ANSWERED, USER_ADDED_QUESTION } from "../actions/users";

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
        case USER_ADDED_QUESTION:
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.question.id])
                }
            }
        default:
            return state
    }
}