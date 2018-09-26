/*
 * Home Actions
 */

import {
  LOAD_RISK_TYPES,
  LOAD_RISK_TYPES_SUCCESS,
  LOAD_RISK_TYPES_FAILURE,
} from './constants';

export const loadRiskTypes = (page) => ({
  type: LOAD_RISK_TYPES,
  page,
});

export const loadRiskTypesSuccess = ({
  results, count, previous, next, page,
}) => ({
  type: LOAD_RISK_TYPES_SUCCESS,
  results,
  count,
  previous,
  next,
  page,
});

export const loadRiskTypesFailure = (error) => ({
  type: LOAD_RISK_TYPES_FAILURE,
  error,
});
