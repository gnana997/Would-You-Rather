export const SET_AUTHED_ID = 'SET_AUTHED_ID'

export function setAuthedId(id){
    return {
        type: SET_AUTHED_ID,
        id
    }
}