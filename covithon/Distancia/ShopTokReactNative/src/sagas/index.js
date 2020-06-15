/* global fetch */

import { all } from 'redux-saga/effects'

import { fetchResponseSaga } from '../apis/apiHelper';
import { loginSaga, generateOTPSaga, logoutSaga } from './loginSaga';
import { getConstantsSaga } from './constantsSaga';
import { getTokens } from "./tokenSaga";
import { putShopsSaga } from './shopRegistrationSaga';
import { getTokenDetails, createComment, rejectTokenSaga } from "./tokenDetailsSaga";

function* rootSaga() {
  yield all([
    fetchResponseSaga(),
    generateOTPSaga(),
    loginSaga(),
    getConstantsSaga(),
    getTokens(),
    putShopsSaga(),
    logoutSaga(),
    getTokenDetails(),
    createComment(),
    rejectTokenSaga(),
  ])
}

export default rootSaga
