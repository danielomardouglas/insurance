import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CardBox from '../../components/CardBox';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import { submitRiskType } from './actions';

import NewRiskTypeForm from './components/newRiskTypeForm';

import './styles/main.scss';


class NewRiskType extends Component {
  render() {
    const { handleSubmit, redirectToRiskType } = this.props;

    return (
      <div>
        <Helmet>
          <title>New Risk Type</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div className="col-md-12">
          <CardBox>
            <NewRiskTypeForm
              onSubmit={handleSubmit}
              onSubmitSuccess={(id) => redirectToRiskType(id)}
            />
          </CardBox>
        </div>
      </div>
    );
  }
}

NewRiskType.propTypes = {
  handleSubmit: PropTypes.func,
  redirectToRiskType: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (values) => new Promise((resolve, reject) => dispatch(
    submitRiskType(values, resolve, reject)
  )),
  redirectToRiskType: (id) => dispatch(
    push(`/riskTypes/${id}`)
  ),
});

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'NewRiskType', reducer });
const withSaga = injectSaga({ key: 'NewRiskType', saga });

export default compose(withReducer, withSaga, withConnect)(NewRiskType);

