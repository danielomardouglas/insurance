import { call, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/lib/immutable';

import apiFetch from '../../utils/request';

import { LOGIN } from './constants';


export function* requestLogin(action) {
  const { values, resolve, reject } = action;
  const requestURL = '/auth/';
  const options = { data: values, method: 'POST' };

  try {
    const { token } = yield call(apiFetch, requestURL, options);
    yield call(resolve, token);
  } catch (err) {
    const submissionError = new SubmissionError();
    submissionError.errors = err;
    yield call(reject, submissionError);
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOGIN, requestLogin);
}
