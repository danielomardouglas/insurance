import { createSelector } from 'reselect';

const selectRiskTypeDetailPage = (state) => state.get('RiskTypeDetailPage');


const makeSelectLoading = () => createSelector(selectRiskTypeDetailPage,
  (subState) => subState.get('loading')
);

const makeSelectError = () => createSelector(selectRiskTypeDetailPage,
  (subState) => subState.get('error')
);

const makeSelectRiskTypeData = () => createSelector(selectRiskTypeDetailPage,
  (subState) => subState.get('riskTypeData')
);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectRiskTypeData,
};
