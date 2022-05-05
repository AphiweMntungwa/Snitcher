import { FETCH_SESSION_REQ, FETCH_SESSION_SUCCESS, FETCH_SESSION_ERROR }
from "../action-constants"

const initialState = {
    loading: false,
    userSession: '',
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_SESSION_REQ:
            return {...state, loading: true }
        case FETCH_SESSION_SUCCESS:
            return {...state, loading: false, userSession: payload }
        case FETCH_SESSION_ERROR:
            return {...state, loading: false, error: payload }

        default:
            return state
    }
}