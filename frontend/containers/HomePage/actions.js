/*
 * Home Actions
 */

import {
  LOAD_RISK_TYPES,
  LOAD_RISK_TYPES_SUCCESS,
  LOAD_RISK_TYPES_FAILURE,
  GET_NEXT_PAGE,
  GET_PREVIOUS_PAGE,
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

export const getNextPage = (currentPage) => ({
  type: GET_NEXT_PAGE,
  currentPage,
});

export const getPreviousPage = (currentPage) => ({
  type: GET_PREVIOUS_PAGE,
  currentPage,
});
