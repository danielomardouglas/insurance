import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';


class CardBox extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
  };

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <div className="card-box" {...otherProps}>
        {children}
      </div>
    );
  }
}

export default CardBox;
