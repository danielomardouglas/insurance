import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import LoadingIndicator from '../../components/LoadingIndicator';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectRiskTypeData,
} from './selectors';

import {
  loadRiskTypeData,
  removeRiskTypeData,
  submitRiskTypeResults,
} from './actions';

import RiskTypeForm from './components/riskTypeForm';

import './styles/main.scss';


class RiskTypeDetailPage extends Component {
  componentDidMount() {
    const { loadData, match } = this.props;
    const { params } = match;
    const { id } = params;
    loadData(id);
  }

  componentWillUnmount() {
    const { unLoadData } = this.props;
    unLoadData();
  }

  render() {
    const {
      loading,
      // error,
      riskTypeData,
      handleSubmit,
      redirectToHome,
    } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    // if (error) {
    //   console.log(error);
    // }

    const {
      // id,
      name,
      risk_fields: riskFields,
    } = riskTypeData || {};

    return (
      <div>
        <Helmet>
          <title>Risk Type</title>
          <meta name="description" content="Risk Type Detail View" />
        </Helmet>
        <div className="risk-type-data-wrapper">
          <div className="title">{name}</div>
          <div className="row">
            <div className="col-md-12">
              {
                !riskTypeData ? (
                  <p>No Data found</p>
                ) : (
                  <RiskTypeForm
                    onSubmit={handleSubmit}
                    onSubmitSuccess={redirectToHome}
                    riskFields={riskFields}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RiskTypeDetailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  loadData: PropTypes.func.isRequired,
  unLoadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // error: PropTypes.any.isRequired,
  riskTypeData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  redirectToHome: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  riskTypeData: makeSelectRiskTypeData(),
});

const mapDispatchToProps = (dispatch) => ({
  loadData: (id) => dispatch(loadRiskTypeData(id)),
  unLoadData: () => dispatch(removeRiskTypeData()),
  handleSubmit: (values) => new Promise((resolve, reject) => dispatch(
    submitRiskTypeResults(values, resolve, reject)
  )),
  redirectToHome: () => dispatch(push('/')),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'RiskTypeDetailPage', reducer });
const withSaga = injectSaga({ key: 'RiskTypeDetailPage', saga });

export default compose(withReducer, withSaga, withConnect)(RiskTypeDetailPage);
