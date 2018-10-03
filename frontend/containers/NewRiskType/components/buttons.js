import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import '../styles/buttons.scss';

class AddNewButton extends Component {
  static propTypes = {
    fields: PropTypes.any.isRequired,
    type: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    type: {},
  };

  render() {
    const { fields, type } = this.props;

    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={() => fields.push(type)}
      >
        <FontAwesome name="plus" />
      </button>
    );
  }
}

class RemoveButton extends Component { // eslint-disable-line react/no-multi-comp
  static propTypes = {
    fields: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
  };

  render() {
    const { fields, index } = this.props;

    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => fields.remove(index)}
      >
        <FontAwesome name="trash" />
      </button>
    );
  }
}

export { AddNewButton, RemoveButton };
