import { fromJS } from 'immutable';

import {
  LOAD_RISK_TYPE_DATA,
  LOAD_RISK_TYPE_DATA_SUCCESS,
  LOAD_RISK_TYPE_DATA_FAILURE,
  REMOVE_RISK_TYPE_DATA,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  riskTypeData: false,
});

function riskTypeDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RISK_TYPE_DATA:
      return state.set('loading', true);
    case LOAD_RISK_TYPE_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('riskTypeData', action.riskTypeData);
    case LOAD_RISK_TYPE_DATA_FAILURE:
      return state
        .set('loading', false)
        .set('error', action.error);
    case REMOVE_RISK_TYPE_DATA:
      return state
        .set('riskTypeData', false);
    default:
      return state;
  }
}

export default riskTypeDetailReducer;
