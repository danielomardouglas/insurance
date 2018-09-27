/*
 * HomeReducer
 */

import { fromJS } from 'immutable';

import {
  LOAD_RISK_TYPES,
  LOAD_RISK_TYPES_SUCCESS,
  LOAD_RISK_TYPES_FAILURE,
  GET_NEXT_PAGE,
  GET_PREVIOUS_PAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  results: false,
  count: 0,
  next: false,
  previous: false,
  page: 1,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RISK_TYPES:
      return state
        .set('loading', true);
    case LOAD_RISK_TYPES_SUCCESS:
      return state
        .set('loading', false)
        .set('results', action.results)
        .set('count', action.count)
        .set('next', action.next)
        .set('previous', action.previous)
        .set('page', action.page);
    case LOAD_RISK_TYPES_FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error);
    case GET_NEXT_PAGE:
      return state
        .set('page', action.currentPage + 1);
    case GET_PREVIOUS_PAGE:
      return state
        .set('page', action.currentPage - 1);
    default:
      return state;
  }
}

export default homeReducer;
