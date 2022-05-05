import { FETCH_POSTS_ERROR, FETCH_POSTS_REQ, FETCH_POSTS_SUCCESS } from "../action-constants";
import axios from "axios";

export const fetchPostsReq = () => {
    return {
        type: FETCH_POSTS_REQ
    }
}
export const fetchPostsSuccess = posts => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}
export const fetchPostsError = error => {
    return {
        type: FETCH_POSTS_ERROR,
        payload: error
    }
}

export const postThunk = () => {
    return (dispatch) => {
        dispatch(fetchPostsReq());
        axios.get('http://localhost:8080/index')
            .then((response) => {
                const { list } = response.data;
                const posts = [];
                list.forEach((el, i) => {
                    posts.push(el);
                });
                dispatch(fetchPostsSuccess(posts));
            })
            .catch(e => dispatch(fetchPostsError(e.message)))
    }
}