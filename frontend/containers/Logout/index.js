import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import { removeToken } from '../../utils/token';


class Logout extends Component {
  constructor(props) {
    super(props);
    removeToken();
  }

  render() {
    return <Redirect to="/auth" />;
  }
}

export default Logout;
