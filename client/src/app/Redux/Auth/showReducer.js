import { SHOW_NEXT } from "../action-constants";

const initialState = {
    showAuth: false
}

const showReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_NEXT:
            return {
                ...state,
                showAuth: payload
            }

        default:
            return state;
    }
}

export default showReducer;