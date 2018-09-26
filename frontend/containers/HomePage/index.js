import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import Table from '../../components/Table';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectNextPage,
  makeSelectPageNumber,
  makeSelectPreviousPage,
  makeSelectResultsCount, makeSelectRiskTypes,
} from './selectors';

import { loadRiskTypes } from './actions';

class HomePage extends React.PureComponent {
  static dataHeaders = [
    {
      name: 'Id',
      field: 'id',
    },
    {
      name: 'Name',
      field: 'name',
    },
  ];

  componentDidMount() {
    const { pageNumber, loadData } = this.props;
    loadData(pageNumber);
  }

  render() {
    const { riskTypes, loading, resultsCount } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    const action = <button type="button">View</button>;

    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div>
          <p>Total Results ({resultsCount})</p>
          {
            !riskTypes || riskTypes.length < 1 ? (
              <p>No Risk Types Found</p>
            ) : (
              <Table
                headers={HomePage.dataHeaders}
                rowData={riskTypes}
                action={action}
              />
            )
          }
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  loadData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  riskTypes: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  ]).isRequired,
  pageNumber: PropTypes.number.isRequired,
  // previousPage: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.number,
  // ]).isRequired,
  // nextPage: PropTypes.oneOfType([
  //   PropTypes.bool,
  //   PropTypes.number,
  // ]).isRequired,
  resultsCount: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  riskTypes: makeSelectRiskTypes(),
  resultsCount: makeSelectResultsCount(),
  nextPage: makeSelectNextPage(),
  previousPage: makeSelectPreviousPage(),
  pageNumber: makeSelectPageNumber(),
});

const mapDispatchToProps = (dispatch) => ({
  loadData: (page) => dispatch(loadRiskTypes(page)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'HomePage', reducer });
const withSaga = injectSaga({ key: 'HomePage', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
