import { LARGE_WINDOW_SIZE, SMALL_WINDOW_SIZE } from "../action-constants"

const initialState = {
    largeWindow: false
}

export default (state = initialState, { type, token }) => {
    switch (type) {

        case LARGE_WINDOW_SIZE:
            return {...state, largeWindow: token }
        case SMALL_WINDOW_SIZE:
            return {...state, largeWindow: false }

        default:
            return state
    }
}