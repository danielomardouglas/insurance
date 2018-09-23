import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div>
          <p>Insurance Home Page</p>
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga)(HomePage);
