import { showLoading, hideLoading } from "react-redux-loading"
import {saveQuestionAnswer} from '../utils/api'
import {userAnswered} from './users'
export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function answerQuestion({id,authedUser,answer}){
    return {
        type: ANSWER_QUESTION,
        id,
        answer,
        authedUser
    }
}

export function handleAnswerQuestion(id,answer){
    return (dispatch,getState) => {
        dispatch(showLoading())
        const {authedUser} = getState()
        console.log(id)
        return saveQuestionAnswer({
            authedUser: authedUser,
            qid: id,
            answer: answer
        }).then(() => dispatch(answerQuestion({
            id: id,
            authedUser,
            answer
        }))).then(() => dispatch(userAnswered({
            qid: id,
            authedUser,
            answer
        }))).then(
            dispatch(hideLoading()))
    }
}