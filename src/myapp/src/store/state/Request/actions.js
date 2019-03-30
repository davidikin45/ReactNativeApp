import actionTypes from '../actionTypes';

//sync
export const requestStart = (actionType, payload) => {
    return {
		type: actionTypes.REQUEST_START,
        actionType: actionType,
        payload: payload
    }
};

//sync
export const requestSuccess = (actionType, response, payload) => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        actionType: actionType,
        response: response,
        payload: payload
    }
};

//sync
export const requestFail = (actionType, error, request) =>{
    return {
		type: actionTypes.REQUEST_FAIL,
		actionType: actionType,
        error: error,
        request : request
    }
};