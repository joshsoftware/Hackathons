import { takeEvery, put, call } from "redux-saga/effects";

import { fetchResponse } from "../apis/apiHelper";
import constantActions, {
  getConstantsFailed,
} from "../actions/constantActions";

export function* getConstants() {
  const {
    getConstantsSucceeded: successAction,
    getConstantsFailed: failureAction,
  } = constantActions;
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: "constants",
        successAction,
        failureAction,
        method: 'GET'
      },
    });
  } catch (error) {
    console.log("get constant error : ", error);
    yield put(getConstantsFailed(error));
  }
}

export function* getConstantsSaga() {
  yield takeEvery(constantActions.getConstants, getConstants);
}
