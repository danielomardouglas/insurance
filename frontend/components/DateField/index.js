import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import Moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import './styles/main.scss';


class DateField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.any,
      invalid: PropTypes.any,
    }),
  };

  handleChange(date) {
    const { input } = this.props;
    const { onChange } = input;
    onChange(date.format('YYYY-MM-DD'));
  }

  handleValue() {
    const { input } = this.props;
    const { value } = input;
    return value ? Moment(value) : Moment();
  }

  render() {
    const { input, label, meta } = this.props;

    const { onChange, value, ...restInputProps } = input;

    const dateValue = this.handleValue();

    const { touched, error, invalid } = meta;

    const className = [
      'form-control',
      touched && invalid ? 'is-invalid' : null,
    ].join(' ');

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}
          <DatePicker
            {...restInputProps}
            selected={dateValue}
            className={className}
            id={label}
            dropdownMode="select"
            onChange={(date) => this.handleChange(date)}
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

export default DateField;
