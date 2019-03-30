import {all, takeEvery, takeLatest, put} from 'redux-saga/effects';

import api from '../../../api';
import makeApiRequest from '../../../api-request-helper';

import actionTypes from '../actionTypes';
import * as actions from '../actions';

export function* saveEventSaga(action){
    yield* makeApiRequest({
        action: action,
        onStart: actions.saveEventStart,
        apiMethod: 'saveEvent',
        onSuccess: actions.saveEventSuccess,
        onFail: actions.saveEventFail,
        payload: action.event
    });


//     yield put(actions.saveEventStart());
//     try {
//         var data = yield api.saveEvent(action.event);
//         yield put(actions.saveEventSuccess(action.event));
//     }
//     catch(err)
//     {
//        yield put(actions.saveEventFail(err)); 
//    }
}    

export function* getEventsSaga(action){
    yield* makeApiRequest({
        action: action,
        onStart: actions.getEventsStart,
        apiMethod: 'getEvents',
        onSuccess: actions.getEventsSuccess,
        onFail: actions.getEventsFail
    });

    // yield put(actions.getEventsStart());
    // try {
    //     var events = yield api.getEvents();
    //     yield put(actions.getEventsSuccess(events));
    //     makeRequest.
    // }
    // catch(err)
    // {
    //     yield put(actions.getEventsFail(err)); 
    // }
}

export function* watchEventSaga(){
    yield all([
        takeLatest(actionTypes.ADD_EVENT, saveEventSaga),
        takeEvery(actionTypes.GET_EVENTS, getEventsSaga)
	]);
}