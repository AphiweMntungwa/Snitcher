import { LARGE_WINDOW_SIZE, SMALL_WINDOW_SIZE } from '../action-constants'

export const largeWindowSize = (token) => {
    return {
        type: LARGE_WINDOW_SIZE,
        token
    }
}
export const smallWindowSize = () => {
    return {
        type: SMALL_WINDOW_SIZE,
    }
}