import {
  LOAD_RISK_TYPE_DATA,
  LOAD_RISK_TYPE_DATA_SUCCESS,
  LOAD_RISK_TYPE_DATA_FAILURE,
  REMOVE_RISK_TYPE_DATA,
  SUBMIT_RISK_TYPE_RESULTS,
} from './constants';

export const loadRiskTypeData = (id) => ({
  type: LOAD_RISK_TYPE_DATA,
  id,
});

export const loadRiskTypeDataSuccess = (riskTypeData) => ({
  type: LOAD_RISK_TYPE_DATA_SUCCESS,
  riskTypeData,
});

export const loadRiskTypeDataFailure = (error) => ({
  type: LOAD_RISK_TYPE_DATA_FAILURE,
  error,
});

export const removeRiskTypeData = () => ({
  type: REMOVE_RISK_TYPE_DATA,
});

export const submitRiskTypeResults = (values, resolve, reject) => ({
  type: SUBMIT_RISK_TYPE_RESULTS,
  values,
  resolve,
  reject,
});
