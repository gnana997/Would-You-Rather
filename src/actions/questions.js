import { showLoading, hideLoading } from "react-redux-loading"
import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {userAnswered,addUserQuestion} from './users'
export const RECEIVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


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

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
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

export function handleAddQuestion(optionOne,optionTwo){
    return (dispatch,getState) => {
        dispatch(showLoading())
        const {authedUser} = getState()
        return saveQuestion({
            optionOneText:optionOne,
            optionTwoText:optionTwo,
            author: authedUser
        }).then((res) => {
            dispatch(addQuestion(res))
            dispatch(addUserQuestion({
                question: res,
                authedUser: authedUser}))
            })
        .then(() => dispatch(hideLoading()))
    }
}