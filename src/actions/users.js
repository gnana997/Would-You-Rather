export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWERED = 'USER_ANSWERED'

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