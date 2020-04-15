import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return action.questions
        case ANSWER_QUESTION:
            console.log(state[action.authedUser])
            return {
                ...state,
                [action.id]:{
                    ...state[action.id],
                    [action.answer]:{
                        ...state[action.id][action.answer],
                        votes: state[action.id][action.answer].votes.concat([action.authedUser])
                    }
                } 
            }
        default:
            return state
    }
}