import { SHOW_NEXT } from '../action-constants'

export const showNext = (payload) => {
    return {
        type: SHOW_NEXT,
        payload
    }
}