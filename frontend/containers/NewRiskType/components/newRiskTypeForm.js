import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';

import TextField from '../../../components/TextField';

import RiskField from './riskField';

import { required } from './validators';

class NewRiskTypeForm extends Component {
  static propTypes = {
    // error: PropTypes.any,
    handleSubmit: PropTypes.func,
    // submitting: PropTypes.any,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="col-md-12">
          <Field
            name="name"
            label="Risk Type Name"
            type="text"
            component={TextField}
            validate={[required]}
          />
        </div>
        <FieldArray name="risk_fields" component={RiskField} />
        <button className="btn btn-info btn-block" type="submit">Save</button>
      </form>
    );
  }
}

export { required };
export default reduxForm({
  form: 'newRiskTypeForm',
})(NewRiskTypeForm);
