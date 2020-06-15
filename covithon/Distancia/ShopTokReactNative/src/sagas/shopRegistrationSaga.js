import { takeEvery, put, call } from "redux-saga/effects";

import { fetchResponse } from "../apis/apiHelper";
import shopRegistrationActions, {
  createShopFailed,
} from "../actions/shopRegistrationActions";

export function* putShops(actions) {
  const { payload: { shopId, body }} = actions;
  const {
    createShopSucceeded: successAction,
    createShopFailed: failureAction,
  } = shopRegistrationActions;
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: `shops/${shopId}`,
        successAction,
        failureAction,
        method: 'PUT',
        body
      },
    });
  } catch (error) {
    console.log("get constant error : ", error);
    yield put(createShopFailed(error));
  }
}

export function* putShopsSaga() {
  yield takeEvery(shopRegistrationActions.createShop, putShops);
}
