/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('HomePage');

const makeSelectLoading = () => createSelector(selectHome,
  (subState) => subState.get('loading')
);

const makeSelectError = () => createSelector(selectHome,
  (subState) => subState.get('error')
);

const makeSelectRiskTypes = () => createSelector(selectHome,
  (subState) => subState.get('results')
);

const makeSelectResultsCount = () => createSelector(selectHome,
  (subState) => subState.get('count')
);

const makeSelectNextPage = () => createSelector(selectHome,
  (subState) => subState.get('next')
);

const makeSelectPreviousPage = () => createSelector(selectHome,
  (subState) => subState.get('previous')
);

const makeSelectPageNumber = () => createSelector(selectHome,
  (subState) => subState.get('page')
);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectRiskTypes,
  makeSelectResultsCount,
  makeSelectNextPage,
  makeSelectPreviousPage,
  makeSelectPageNumber,
};
