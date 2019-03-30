import actionTypes from '../actionTypes';

//sync
export const addEventStart = (payload) =>{
    return {
        type: actionTypes.ADD_EVENT_START,
        payload: payload
    }
};

//sync
export const addEventSuccess = (response, payload) =>{
    return {
        type: actionTypes.ADD_EVENT_SUCCESS,
        event: payload,
        response : response
    }
};

//sync
export const addEventFail = (error, payload) =>{
    return {
        type: actionTypes.ADD_EVENT_FAIL,
        error: error,
        payload : payload
    }
};

//async
export const addEvent = (event) =>{
    return {
        type: actionTypes.ADD_EVENT,
        event: event
    };
    // return async dispatch =>{
    //      dispatch(addEventStart());
    //      try {
    //          var data = await api.addEvent(event);
    //          dispatch(addEventSuccess(event));
    //      }
    //      catch(err)
    //      {
    //         dispatch(addEventFail(err)); 
    //     }
    // }
};

//sync
export const getEventsStart = (payload) =>{
    return {
        type: actionTypes.GET_EVENTS_START,
        payload: payload
    }
};

//sync
export const getEventsSuccess = (response, payload) =>{
    return {
        type: actionTypes.GET_EVENTS_SUCCESS,
        events: response,
        payload : payload
    }
};

//sync
export const getEventsFail = (error, payload) =>{
    return {
        type: actionTypes.GET_EVENTS_FAIL,
        error: error,
        payload: payload
    }
};

//async
export const getEvents = () =>{
    return {
        type: actionTypes.GET_EVENTS
    };

    // return async dispatch =>{
    //      dispatch(getEventsStart());
    //      try {
    //          var events = await api.getEvents();
    //          dispatch(getEventsSuccess(events));
    //      }
    //      catch(err)
    //      {
    //         dispatch(getEventsFail(err)); 
    //     }
    // }
};