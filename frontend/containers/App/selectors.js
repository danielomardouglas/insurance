/**
 * The global state selectors
 */

import { createSelector,  } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(selectRoute,
  (subState) => subState.get('location').toJS()
);


export {
  selectGlobal,
  makeSelectLocation,
};
