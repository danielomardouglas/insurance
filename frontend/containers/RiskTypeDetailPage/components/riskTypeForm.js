import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import TextField from '../../../components/TextField';
import SelectInput from '../../../components/SelectInput';
import DateField from '../../../components/DateField';

const fieldTypes = {
  text: {
    type: 'text',
    component: TextField
  },
  enum: {
    type: 'select',
    component: SelectInput
  },
  date: {
    type: 'text',
    component: DateField
  },
  number: {
    type: 'number',
    component: TextField,
  }
};

class RiskTypeForm extends Component {
  static propTypes = {
    riskFields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.string,
        ),
      })
    ).isRequired,
    // error: PropTypes.any,
    handleSubmit: PropTypes.func,
    // submitting: PropTypes.any,
  };

  render() {
    const {
      // error,
      handleSubmit,
      // submitting,
      riskFields
    } = this.props;

    return (
      <div>
        <form className="form-row" onSubmit={handleSubmit}>
          {
            riskFields.map((riskField) => (
              <div className="col-md-6" key={riskField.name}>
                {
                  (riskField.type in fieldTypes) ? (
                    <Field
                      name={riskField.name}
                      label={riskField.name}
                      options={riskField.options}
                      type={fieldTypes[riskField.type].type}
                      component={fieldTypes[riskField.type].component}
                    />
                  ) : null
                }
              </div>
            ))
          }
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'riskTypeForm',
})(RiskTypeForm);
