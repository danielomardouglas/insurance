import { SUBMIT_RISK_TYPE } from './constants';

export const submitRiskType = (values, resolve, reject) => ({
  type: SUBMIT_RISK_TYPE,
  values,
  resolve,
  reject,
});
