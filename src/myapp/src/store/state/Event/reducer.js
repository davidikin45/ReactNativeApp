import actionTypes from '../actionTypes';
import {updateObject} from '../../../shared/utility';

var defaultState = {
   events: [],
   loading: false
};

const addEventStart = (state, action) =>{
    return updateObject(state, {loading: true});
}

const addEventSuccess = (state, action) =>{
    const newEvent = updateObject(action.event, {id: action.event.title});
    return updateObject(state, {
        loading: false,
        events: state.events.concat(newEvent)})
}

const addEventFail = (state, action) =>{
    return updateObject(state, {loading: false});
}

const getEventsStart = (state, action) =>{
    return updateObject(state, {loading: true});
}

const getEventsSuccess = (state, action) =>{
    return updateObject(state, {events: action.events, loading: false});
}

const getEventsFail = (state, action) =>{
    return updateObject(state, {loading: false});
}

export const event = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT_START: {
            return addEventStart(state, action);
        }

        case actionTypes.ADD_EVENT_SUCCESS: {
            return addEventSuccess(state, action);
        }

        case actionTypes.ADD_EVENT_FAIL: {
            return addEventFail(state, action);
        }

        case actionTypes.GET_EVENTS_START: {
            return getEventsStart(state, action);
        }

        case actionTypes.GET_EVENTS_SUCCESS: {
            return getEventsSuccess(state, action);
        }

        case actionTypes.GET_EVENTS_FAIL: {
            return getEventsFail(state, action);
        }

        default:
            return state;
    }
};

export default event;