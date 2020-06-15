import { takeLatest, put, call } from "redux-saga/effects";
import tokenAction from "../actions/tokenActions";
import { fetchResponse } from "../apis/apiHelper";
import { fetchTokensFailed } from "../actions/tokenActions";

function* tokenList(actions) {
  const { fetchTokensSucceeded: successAction,
    fetchTokensFailed: failureAction } = tokenAction;

  const { payload: selectedDate } = actions;
  try {
    yield call(fetchResponse, {
      payload: {
        body: {
          date: selectedDate
        },
        reqPath: "tokens",
        successAction,
        failureAction,
        method: 'GET'
      },
    });
  } catch (error) {
    console.log("error", error);
    yield put(fetchTokensFailed(error));
  }
}

export function* getTokens() {
  yield takeLatest(tokenAction.fetchTokens, tokenList)
}