import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import './styles/main.scss';

const RadioButton = ({ input, opt }) => (
  <div className="form-check form-check-inline">
    <input
      {...input}
      type="radio"
      className="form-check-input"
      id={opt}
    />
    <label className="form-check-label" htmlFor={opt}>{opt}</label> {/* eslint-disable-line jsx-a11y/label-has-for */}
  </div>
);

class OptionField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  };

  render() {
    const { name, options } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>  {/* eslint-disable-line jsx-a11y/label-has-for */}
        <div className="options-list" id={name}>
          {
            options.map((opt) => (
              <Field name={name} component={RadioButton} type="radio" opt={opt} value={opt} key={opt} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default OptionField;
