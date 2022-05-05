import { FETCH_POSTS_ERROR, FETCH_POSTS_REQ, FETCH_POSTS_SUCCESS }
from "../action-constants"

const initialState = {
    loading: false,
    posts: '',
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_POSTS_REQ:
            return {...state, loading: true }
        case FETCH_POSTS_SUCCESS:
            return {...state, posts: payload, loading: false }
        case FETCH_POSTS_ERROR:
            return {...state, error: payload, loading: false }

        default:
            return state
    }
}