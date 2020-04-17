export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWERED = 'USER_ANSWERED'
export const USER_ADDED_QUESTION = 'USER_ADDED_QUESTION'

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function userAnswered({ authedUser, qid, answer }){
    return {
        type: USER_ANSWERED,
        authedUser,
        qid,
        answer
    }
}

export function addUserQuestion({question,authedUser}){
    return {
        type: USER_ADDED_QUESTION,
        question,
        authedUser
    }
}