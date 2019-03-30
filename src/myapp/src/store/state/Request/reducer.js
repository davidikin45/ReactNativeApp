import actionTypes from '../actionTypes';
import {updateObject} from '../../../shared/utility';

var defaultState = {
    running: false,
    success: false,
    error: '',
    action: null,
    request: null,
    response: null,
};

const startRequest = (state, action, request) =>{
    return updateObject(state, {running: true, error: '', action: action.action, request: action.request, response: null, success: false});
}

const requestSuccess = (state, action) =>{
    return updateObject(state, {running: true, error: '', action: action.action, request: action.request, reponse: action.response, success: true});
}

const requestFail = (state, action, request) =>{
    return updateObject(state, {running: false, error: action.error, action: action.action, request: action.request, response: null, success: false});
}

const resetRequests = (state, action) =>{
    return updateObject(state, {running: false, error:'', action: null, request: null, response: null, success: false});
}

export const request = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_START: {
            return startRequest(state, action);
        }

        case actionTypes.REQUEST_SUCCESS: {
            return requestSuccess(state, action);
        }

        case actionTypes.REQUEST_FAIL: {
            return requestFail(state, action);
        }

        case actionTypes.REQUEST_RESET: {
            return resetRequests(state, action);
        }

        default:
            return state;
    }
};

export default request;