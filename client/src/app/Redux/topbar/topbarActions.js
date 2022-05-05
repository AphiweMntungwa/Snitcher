import { TOGGLE_BURGER } from '../action-constants'

export const toggleBurger = (payload) => {
    return {
        type: TOGGLE_BURGER,
        payload
    }
}