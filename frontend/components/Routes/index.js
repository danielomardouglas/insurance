import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import getToken from '../../utils/token';


const propTypes = {
  component: PropTypes.func.isRequired,
};


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!getToken()) {
        return <Component {...props} />;
      }
      return <Redirect to="/" />;
    }}
  />
);

AuthRoute.propTypes = propTypes;


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (getToken()) {
        return <Component {...props} />;
      }
      return <Redirect to="/auth" />;
    }}
  />
);

PrivateRoute.propTypes = propTypes;


export default PrivateRoute;
export { AuthRoute };
