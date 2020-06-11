import {
  put,
  takeLatest,
  takeEvery,
  all,
  call,
  select,
} from "redux-saga/effects";
import { setAuthSuccess, setAuthFailure } from "actions";
import { USERS_URL, SESSIONS_URL } from "constants/apiConstants";
import { setStore, setStoreError, setCategories, setStores } from "actions";
import {
  REGISTER_STORE,
  FETCH_CATEGORIES,
  SET_INACTIVE_SLOTS,
  ADD_STORE_OWNER,
  LOG_IN_USER,
  FETCH_STORES,
  FETCH_ADMIN_STORES,
  DISABLE_STORE,
  GET_STORE_DETAILS,
} from "constants/actionConstants";
import {
  NqSuccessNotification,
  NqErrorNotification,
} from "core-components/NqNotification";
import { PostApiCall, GetApiCall, DeleteApiCall, getJSON } from "apis";
import { getToken } from "../selectors";

function* authorizedPostApiCall(url, body) {
  const token = yield select(getToken);
  const json = yield call(PostApiCall, url, body, { Authorization: token });

  const response = yield call(getJSON, json);

  return response;
}

function* authorizedGetApiCall(url, filterParams) {
  const token = yield select(getToken);

  const json = yield call(GetApiCall, url, filterParams, {
    Authorization: token,
  });

  const response = yield call(getJSON, json);

  return response;
}

function* authorizedDeleteApiCall(url) {
  const token = yield select(getToken);

  const json = yield call(DeleteApiCall, url, {
    Authorization: token,
  });

  return json;
}

function* registerStore(store) {
  try {
    const json = yield call(authorizedPostApiCall, "/stores", store);
    if (json.data) {
      yield put(setStore(json.data));
      yield call(NqSuccessNotification, json.message);
    } else {
      yield put(setStoreError(json.error));
      yield call(NqErrorNotification, json.message);
    }
  } catch (error) {
    yield put(setStoreError(error));
  }
}

function* fetchCategories() {
  try {
    const response = yield call(GetApiCall, "/categories");
    const json = yield call(getJSON, response);

    if (json.data) {
      yield put(setCategories(json.data));
    }
  } catch (error) {
    yield call(NqErrorNotification, error);
  }
}

function* setInactiveSlots(slots) {
  try {
    const json = yield call(authorizedPostApiCall, "/slots/mark", slots);
    if (json.data) {
      yield call(NqSuccessNotification, json.message);
    }
  } catch (error) {
    yield call(NqErrorNotification, error);
  }
}

function* watcher() {
  yield takeLatest(REGISTER_STORE, registerStore);
  yield takeLatest(FETCH_CATEGORIES, fetchCategories);
  yield takeLatest(SET_INACTIVE_SLOTS, setInactiveSlots);
  yield takeLatest(ADD_STORE_OWNER, addShopOwner);
  yield takeLatest(LOG_IN_USER, logInUser);
  yield takeLatest(FETCH_STORES, fetchStores);
  yield takeLatest(FETCH_ADMIN_STORES, fetchAdminStores);
  yield takeEvery(DISABLE_STORE, disableStore);
  yield takeLatest(GET_STORE_DETAILS, getStoreDetails);
}

export default function* rootSaga() {
  yield all([watcher()]);
}

function* addShopOwner(body) {
  try {
    const json = yield PostApiCall(USERS_URL, body).then((response) => {
      return response.json();
    });
    if (json.data.auth_token) {
      yield put(setAuthSuccess(json.data.auth_token));
    } else {
      yield put(setAuthFailure(json.message));
      yield call(NqErrorNotification, json.message.join("."));
    }
  } catch (error) {
    yield put(setAuthFailure(error));
  }
}

function* logInUser(data) {
  try {
    var body = { user: data.user };
    const json = yield PostApiCall(SESSIONS_URL, body).then((response) => {
      return response.json();
    });
    if (json.data.auth_token) {
      yield put(setAuthSuccess(json.data));
    } else {
      yield put(setAuthFailure(json.message));
      yield call(NqErrorNotification, json.message);
    }
  } catch (error) {
    yield put(setAuthFailure(error));
  }
}

function* fetchStores(data) {
  try {
    const response = yield call(GetApiCall, "/stores", data.filterParams);
    const json = yield call(getJSON, response);

    if (json.data) {
      yield put(setStores(json.data));
    }
  } catch (error) {
    yield call(NqErrorNotification, error);
  }
}

function* fetchAdminStores(data) {
  try {
    const json = yield call(
      authorizedGetApiCall,
      "/admin/stores",
      data.filterParams
    );

    if (json.data) {
      yield put(setStores(json.data));
    }
  } catch (error) {
    yield call(NqErrorNotification, error);
  }
}

function* disableStore(data) {
  const json = yield call(
    authorizedDeleteApiCall,
    "/admin/disable_store/" + data.id
  );
}

function* getStoreDetails() {
  try {
    const json = yield call(authorizedGetApiCall, "/stores/list");

    if (json.data) {
      yield put(setStore(json.data));
    }
  } catch (error) {
    yield call(NqErrorNotification, error);
  }
}
