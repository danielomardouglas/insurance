/**
 * HomePage Saga
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { LOAD_RISK_TYPES } from './constants';
import { loadRiskTypesSuccess, loadRiskTypesFailure } from './actions';

import apiFetch from '../../utils/request';

export function* requestGetRiskTypes(action) {
  const { page } = action;
  const requestURL = '/custom/riskTypes/';
  const urlParams = { page };
  const options = {
    urlParams,
  };

  try {
    const response = yield call(apiFetch, requestURL, options);
    yield put(loadRiskTypesSuccess(response));
  } catch (err) {
    yield put(loadRiskTypesFailure(err));
  }
}


export default function* defaultSaga() {
  yield takeLatest(LOAD_RISK_TYPES, requestGetRiskTypes);
}
