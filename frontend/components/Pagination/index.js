import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './styles/main.scss';

class Pagination extends Component {
  static propTypes = {
    onPreviousPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    disabledPrevious: PropTypes.bool.isRequired,
    disabledNext: PropTypes.bool.isRequired,
  };

  render() {
    const {
      disabledNext,
      disabledPrevious,
      currentPage,
      onNextPage,
      onPreviousPage
    } = this.props;

    return (
      <div className="pagination">
        <button
          className="pagination-item"
          disabled={disabledPrevious}
          onClick={onPreviousPage}
        >
          <FontAwesome name="chevron-left" />
        </button>
        <button className="pagination-item current">{currentPage}</button>
        <button
          className="pagination-item"
          disabled={disabledNext}
          onClick={onNextPage}
        >
          <FontAwesome name="chevron-right" />
        </button>
      </div>
    );
  }
}

export default Pagination;
