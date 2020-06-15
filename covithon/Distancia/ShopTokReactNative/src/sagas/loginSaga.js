import { takeEvery, put, call } from "redux-saga/effects";

import { fetchResponse, callApi } from "../apis/apiHelper";
import loginActions, {
  logInFailed, generateOTPFailed,
} from "../actions/logInActions";

export function* login(actions) {
  const {
    payload: { mobileNumber, otp }
  } = actions;
  const {
    logInSucceeded: successAction,
    logInFailed: failureAction,
  } = loginActions;
  try {
    yield call(callApi, {
      payload: {
        body: {
          "mobile_number": mobileNumber,
          "otp": otp,
        },
        reqPath: "authenticate_otp",
        successAction,
        failureAction,
        method: 'POST'
      },
    });
  } catch (error) {
    console.log("login error ", error);
    yield put(logInFailed(error));
  }
}

export function* generateOTP(actions) {
  const {
    payload: { mobileNumber }
  } = actions;

  const {
    generateOTPSucceeded: successAction,
    generateOTPFailed: failureAction,
  } = loginActions;
  try {
    yield call(callApi, {
      payload: {
        body: {
          "mobile_number": mobileNumber,
        },
        reqPath: "generate_otp",
        successAction,
        failureAction,
        method: 'POST'
      },
    });
  } catch (error) {
    console.log("generate otp error ", error);
    yield put(generateOTPFailed(error));
  }
}

export function* logout() {
  const {
    resetLogin: successAction,
    logInFailed: failureAction,
  } = loginActions;
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: "log_out",
        successAction,
        failureAction,
        method: 'DELETE'
      },
    });
  } catch (error) {
    console.log("logout error ", error);
    yield put(logInFailed(error));
  }
}

export function* loginSaga() {
  yield takeEvery(loginActions.login, login);
}

export function* generateOTPSaga() {
  yield takeEvery(loginActions.generateOTP, generateOTP);
}

export function* logoutSaga() {
  yield takeEvery(loginActions.logout, logout);
}
