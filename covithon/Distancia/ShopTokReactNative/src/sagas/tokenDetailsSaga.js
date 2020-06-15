import { takeLatest, put, call } from "redux-saga/effects";
import tokenDetailsActions from "../actions/tokenDetails";
import { fetchResponse } from "../apis/apiHelper";

function* fetchDetails(action) {
  const { fetchDetailsSucceess: successAction,
    fetchDetailsFailed: failureAction } = tokenDetailsActions;
  
  const { payload: selectedTokenId }= action
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: `tokens/${selectedTokenId}`,
        successAction,
        failureAction,
        method: 'GET'
      },
    });
  } catch (error) {
    console.log("error", error);
    //yield put(fetchTokensFailed(error));
  }
}

export function* getTokenDetails() {
  yield takeLatest(tokenDetailsActions.fetchDetails, fetchDetails)
}

function* addComment(action) {
  const {
    createCommentSuccess: successAction,
    createCommentFailed: failureAction
  } = tokenDetailsActions;
  const { payload: { selectedTokenId, body } }= action;
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: `tokens/${selectedTokenId}/messages`,
        body: {
          message: { body }
        },
        successAction,
        failureAction,
        method: "POST"
      }
    });
  } catch (error) {
    console.log("error", error);
  }
}

export function* createComment() {
  yield takeLatest(tokenDetailsActions.createComment, addComment)
}

function* rejectToken(action) {
  const {
    rejectTokenSuccess: successAction,
    rejectTokenFailed: failureAction
  } = tokenDetailsActions;
  const { payload: { selectedTokenId } }= action;
  try {
    yield call(fetchResponse, {
      payload: {
        reqPath: `tokens/${selectedTokenId}/cancel`,
        successAction,
        failureAction,
        method: "DELETE"
      }
    });
  } catch (error) {
    console.log("error in reject token", error);
  }
}

export function* rejectTokenSaga() {
  yield takeLatest(tokenDetailsActions.rejectToken, rejectToken)
}

