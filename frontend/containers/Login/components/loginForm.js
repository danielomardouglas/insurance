import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

// Validate field to not be blank
const required = (value) => (value ? undefined : 'This field is required');

class LoginForm extends Component {
  static propTypes = {
    // error: PropTypes.any,
    handleSubmit: PropTypes.func,
    // submitting: PropTypes.any,
  };

  render() {
    const {
      // error,
      handleSubmit,
      // submitting,
    } = this.props;

    return (
      <div>
        <form className="form-row" onSubmit={handleSubmit}>
          <Field
            name="username"
            label="Username"
            type="text"
            component={TextField}
            validate={[required]}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={TextField}
            validate={[required]}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm);
