import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';

import apiFetch from '../../utils/request';

import {
  LOAD_RISK_TYPE_DATA,
  SUBMIT_RISK_TYPE_RESULTS,
} from './constants';

import {
  loadRiskTypeDataSuccess,
  loadRiskTypeDataFailure,
} from './actions';

import { makeSelectRiskTypeData } from './selectors';

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

export function* requestSubmitRiskTypeResults(action) {
  const { values, resolve, reject } = action;
  const { id } = yield select(makeSelectRiskTypeData());

  const requestURL = `/custom/riskTypes/${id}/results/`;
  const options = { data: values, method: 'POST' };

  try {
    yield call(apiFetch, requestURL, options);
    yield call(resolve);
  } catch (err) {
    const submissionError = new SubmissionError();
    submissionError.errors = err;
    yield call(reject, submissionError);
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_RISK_TYPE_DATA, requestRiskTypeData);
  yield takeLatest(SUBMIT_RISK_TYPE_RESULTS, requestSubmitRiskTypeResults);
}
