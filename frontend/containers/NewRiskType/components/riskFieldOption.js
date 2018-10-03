import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import TextField from '../../../components/TextField';

import { AddNewButton, RemoveButton } from './buttons';
import { required } from './validators';

import '../styles/main.scss';


class RiskFieldOption extends Component {
  static propTypes = {
    fields: PropTypes.any,
  };

  componentDidMount() {
    const { fields } = this.props;
    fields.push('');
  }

  render() {
    const { fields } = this.props;

    return (
      <div>
        {
          fields.map((option, index) => (
            <div className="form-row align-items-center" key={`riskFields_${index + index}`}>
              <div className="col-lg-5 col-md-5 col-sm-6 col-6">
                <Field
                  name={option}
                  label={`#${index + 1} Risk Field Option`}
                  type="text"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2 col-2 d-flex justify-content-center">
                <AddNewButton fields={fields} type="" />
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2 col-2 d-flex justify-content-center">
                <RemoveButton fields={fields} index={index} />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default RiskFieldOption;
