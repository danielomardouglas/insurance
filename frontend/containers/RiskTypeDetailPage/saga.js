import { call, put, takeLatest } from 'redux-saga/effects';

import apiFetch from '../../utils/request';

import { LOAD_RISK_TYPE_DATA } from './constants';

import {
  loadRiskTypeDataSuccess,
  loadRiskTypeDataFailure,
} from './actions';

export function* requestRiskTypeData(action) {
  const { id } = action;
  const requestURL = `/custom/riskTypes/${id}`;

  try {
    const riskTypeData = yield call(apiFetch, requestURL);
    yield put(loadRiskTypeDataSuccess(riskTypeData));
  } catch (err) {
    yield put(loadRiskTypeDataFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_RISK_TYPE_DATA, requestRiskTypeData);
}
