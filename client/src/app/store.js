import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import sessionReducer from './Redux/session/sessionReducer'
import postReducer from './Redux/posts/postReducer'
import topbarReducer from './Redux/topbar/topbarReducer';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        post: postReducer,
        topbar: topbarReducer
    },
    devTools: { logger, thunk }
})