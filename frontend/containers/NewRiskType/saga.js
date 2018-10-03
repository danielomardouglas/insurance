import { call, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/lib/immutable';

import apiFetch from '../../utils/request';

import { SUBMIT_RISK_TYPE } from './constants';


export function* requestSubmitRiskType(action) {
  const { values, resolve, reject } = action;
  const requestURL = '/custom/riskTypes/';
  const options = { data: values, method: 'POST' };

  try {
    const { id } = yield call(apiFetch, requestURL, options);
    yield call(resolve, id);
  } catch (err) {
    const submissionError = new SubmissionError();
    submissionError.errors = err;
    yield call(reject, submissionError);
  }
}

export default function* defaultSaga() {
  yield takeLatest(SUBMIT_RISK_TYPE, requestSubmitRiskType);
}
