import { takeEvery, put } from "redux-saga/effects";
// import { API_BASE_URL } from 'react-native-dotenv';
const API_BASE_URL = "https://fierce-mountain-81517.herokuapp.com";

import { API_TOKEN_EXPIRED_CODE } from "../constants";

import fetchActions from "../actions/fetchActions";
import { storeData, retrieveData } from "../services/storageService";

const getAuthorizationHeader = (authToken) => {
  return {
    auth: authToken,
  };
};

const getQueryString = params => {
  const queryString = [];
  for (let key in params) {
    if (params[key]) {
      queryString.push(`${key}=${params[key]}`);
    }
  }
  return queryString.join("&");
};


const getRequestUrl = (reqPath, body, method) => {
  if (method === 'GET') {
    return `${API_BASE_URL}/api/v1/${reqPath}?${getQueryString(body)}`;
  }
  return `${API_BASE_URL}/api/v1/${reqPath}`;
};

const defaultHeaders = () => ({
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache",
  pragma: "no-cache",
});

export const isSuccessResponse = (status) => status >= 200 && status < 300;

const dispatcherHelper = (action, parsedResponse, error = false) => ({
  type: action,
  payload: { ...parsedResponse, error },
});

export function* fetchResponse(actions) {
  const {
    payload: { body, reqPath, successAction, failureAction, method = "GET" },
  } = actions;

  let { authToken = null } = actions.payload;

  if (!authToken) {
    authToken = yield retrieveData('auth');
  }

  const fetchUrl = getRequestUrl(reqPath, body, method);
  let requestBody = null;
  
  if( method !== 'GET') {
    requestBody = body && JSON.stringify(body)
  }

  try { 
    if (authToken != null) {
      let authorizationHeader = getAuthorizationHeader(authToken);

      const fetchOptions = {
        method,
        headers: { ...defaultHeaders(), ...authorizationHeader },
        body: requestBody,
      };

      const response = yield fetch(fetchUrl, fetchOptions);
      if (response && response.status === API_TOKEN_EXPIRED_CODE) {
        console.warn('API_TOKEN_EXPIRED_CODE');
        // TODO handle api token expire sceanrio
      }

      const parsedResponse = yield response.json();

      if (response.ok) {
        yield put(dispatcherHelper(successAction, parsedResponse));
        if (successAction === 'RESET_LOGIN') {
          yield put(dispatcherHelper('RESET_OTP'));
        }
      } else {
        yield put(dispatcherHelper(failureAction, parsedResponse, true));
      }
    } else {
      console.error("API Token Missing");
      // TODO handling for api token expiry
    }
  } catch (error) {
    throw error;
  }
}

export function* callApi(actions) {
  const {
    payload: { body, reqPath, successAction, failureAction, method = "GET" },
  } = actions;

  const fetchUrl = getRequestUrl(reqPath, body, method);
  try {
    const fetchOptions = {
      method,
      headers: defaultHeaders(),
      body: body && JSON.stringify(body),
    };

    const response = yield fetch(fetchUrl, fetchOptions);
    const parsedResponse = yield response.json();

    if (response.ok) {
      const auth = response.headers.get("auth");
      if(auth != null) {
        const shopId = parsedResponse.data.id;
        storeData('auth', auth);
        storeData('shopId', shopId);
      }
      yield put(
        dispatcherHelper(successAction, {
          ...parsedResponse,
          auth,
        })
      );
    } else {
      yield put(dispatcherHelper(failureAction, parsedResponse, true));
    }
  } catch (error) {
    throw error;
  }
}

export function* fetchResponseSaga() {
  yield takeEvery(fetchActions.fetchResponse, fetchResponse);
}
