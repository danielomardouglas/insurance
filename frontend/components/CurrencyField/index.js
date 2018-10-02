import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';


class CurrencyField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
      invalid: PropTypes.any,
    }),
  };

  render() {
    const {
      input, label, meta,
    } = this.props;

    const { error, touched, invalid } = meta;

    const className = [
      'form-control',
      touched && invalid ? 'is-invalid' : null,
      'currency',
    ].join(' ');

    return (
      <div className="input-group">
        <label htmlFor={label}>{label}
          <div className="d-flex justify-content-center align-items-center">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              {...input}
              type="number"
              id={label}
              className={className}
            />
          </div>
          {
            touched && invalid ? (
              <div className="invalid-feedback">
                {error}
              </div>
            ) : null
          }
        </label>
      </div>
    );
  }
}

export default CurrencyField;
