import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import getToken from '../../utils/token';

import reducer from './reducer';
import saga from './saga';

import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectNextPage,
  makeSelectPageNumber,
  makeSelectPreviousPage,
  makeSelectResultsCount,
  makeSelectRiskTypes,
} from './selectors';

import {
  getNextPage,
  getPreviousPage,
  loadRiskTypes
} from './actions';

import './styles/main.scss';

class HomePage extends Component {
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
    this.loadRiskTypes();
  }

  shouldComponentUpdate(nextProps) {
    const { pageNumber, riskTypes } = this.props;
    const { pageNumber: nextPageNumber, riskTypes: nextRiskTypes } = nextProps;
    return pageNumber !== nextPageNumber || !isEqual(riskTypes, nextRiskTypes);
  }

  componentDidUpdate() {
    this.loadRiskTypes();
  }

  loadRiskTypes() {
    const { pageNumber, loadData } = this.props;
    loadData(pageNumber);
  }

  render() {
    const {
      riskTypes,
      loading,
      resultsCount,
      pageNumber,
      previousPage,
      nextPage,
      changePageToNext,
      changePageToPrevious,
    } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    const Action = (props) => <Link {...props}>Add risk</Link>;

    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Total Results ({resultsCount})</p>
            {
              getToken() ? (
                <Link className="add-new" to="/newRiskType">
                  Create New Risk Type
                </Link>
              ) : null
            }
          </div>
          {
            !riskTypes || riskTypes.length < 1 ? (
              <p>No Risk Types Found</p>
            ) : [
              <Table
                key="riskTypesTable"
                headers={HomePage.dataHeaders}
                rowData={riskTypes}
                action={Action}
              />,
              <Pagination
                key="riskTypesPagination"
                onPreviousPage={() => changePageToPrevious(pageNumber)}
                onNextPage={() => changePageToNext(pageNumber)}
                currentPage={pageNumber}
                disabledPrevious={previousPage === false}
                disabledNext={nextPage === false}
              />
            ]
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
  previousPage: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  resultsCount: PropTypes.number.isRequired,
  changePageToNext: PropTypes.func.isRequired,
  changePageToPrevious: PropTypes.func.isRequired,
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
  changePageToNext: (page) => dispatch(getNextPage(page)),
  changePageToPrevious: (page) => dispatch(getPreviousPage(page)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'HomePage', reducer });
const withSaga = injectSaga({ key: 'HomePage', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
