import { call, put } from "redux-saga/effects";

import api from "./api";
import {
  requestStart,
  requestSuccess,
  requestFail
} from "./store/state/Request/actions";

export default function*(options) {
  const { action, apiMethod, payload, onStart, onSuccess, onFail } = options;

  try {
		if (onStart) yield put(onStart(payload));
		
    yield put(requestStart(action.type, payload));

    let response = null;
    if (payload) {
      response = yield call([api, apiMethod], payload);
    } else {
      response = yield call([api, apiMethod]);
    }

		yield put(requestSuccess(action.type, response, payload));
		
    if (onSuccess) yield put(onSuccess(response, payload));
  } catch (error) {
		yield put(requestFail(action.type, error.message, payload));
		
		if (onFail) yield put(onFail(error.message, payload));
  }
}
