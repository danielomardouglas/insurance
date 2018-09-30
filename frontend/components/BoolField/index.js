import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';

class BoolField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const {
      input, label, type,
    } = this.props;

    return (
      <div className="checkbox-wrapper">
        <input {...input} type={type} id={label} className="checkbox" />
        <label htmlFor={label} className="label">  {/* eslint-disable-line jsx-a11y/label-has-for */}
          {label}
        </label>
      </div>
    );
  }
}

export default BoolField;
