import { TOGGLE_BURGER } from "../action-constants";

const initialState = {
    toggler: false
}

const topbarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_BURGER:
            return {
                ...state,
                toggler: payload
            }

        default:
            return state;
    }
}

export default topbarReducer;