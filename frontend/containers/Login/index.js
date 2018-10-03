import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { setToken } from '../../utils/token';

import CardBox from '../../components/CardBox';

import LoginForm from './components/loginForm';

import reducer from './reducer';
import saga from './saga';

import { login } from './actions';

import './styles/main.scss';

class Login extends Component {
  render() {
    const { handleSubmit, redirectToHomePage } = this.props;

    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <CardBox>
              <div className="login-header">
                Login
              </div>
              <LoginForm
                onSubmit={handleSubmit}
                onSubmitSuccess={(token) => {
                  setToken(token);
                  redirectToHomePage();
                }}
              />
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func,
  redirectToHomePage: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (values) => new Promise((resolve, reject) => dispatch(
    login(values, resolve, reject)
  )),
  redirectToHomePage: () => dispatch(
    push('/')
  ),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Login', reducer });
const withSaga = injectSaga({ key: 'Login', saga });

export default compose(withReducer, withSaga, withConnect)(Login);
