import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
      warning: PropTypes.any,
    }),
  };

  render() {
    const {
      input, label, meta, options,
    } = this.props;

    const { error, touched, invalid } = meta;

    const className = [
      'form-control',
      touched && invalid ? 'is-invalid' : null,
    ].join(' ');

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}
          <select {...input} className={className} id={label}>
            {
              options.map((opt) => (
                <option value={opt} key={opt}>{opt}</option>
              ))
            }
          </select>
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

export default SelectInput;
