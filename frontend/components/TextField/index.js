import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';

class TextField extends Component {
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
      input, label, meta
    } = this.props;

    const { error, touched, invalid } = meta;

    const className = [
      'form-control',
      touched && invalid ? 'is-invalid' : null,
    ].join(' ');

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}
          <input
            {...input}
            id={label}
            className={className}
          />
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

export default TextField;
