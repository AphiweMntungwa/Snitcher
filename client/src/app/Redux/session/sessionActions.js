import { FETCH_SESSION_REQ, FETCH_SESSION_SUCCESS, FETCH_SESSION_ERROR }
from "../action-constants";
import axios from "axios";

export const fetchSessionReq = () => {
    return {
        type: FETCH_SESSION_REQ
    }
}
export const fetchSessionSuccess = userSession => {
    return {
        type: FETCH_SESSION_SUCCESS,
        payload: userSession
    }
}
export const fetchSessionError = error => {
    return {
        type: FETCH_SESSION_ERROR,
        payload: error
    }
}

export const sessionThunk = () => {
    return (dispatch) => {
        dispatch(fetchSessionReq());
        axios.get("http://localhost:8080/login")
            .then((response) => {
                dispatch(fetchSessionSuccess(response.data));
            })
            .catch(e => dispatch(fetchSessionError(e.message)))
    }
}