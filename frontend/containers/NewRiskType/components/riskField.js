import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, formValues } from 'redux-form/immutable';

import TextField from '../../../components/TextField';
import SelectInput from '../../../components/SelectInput';

import RiskFieldOption from './riskFieldOption';
import { AddNewButton, RemoveButton } from './buttons';
import { required } from './validators';

const riskFieldOptions = [
  'text',
  'select',
  'date',
  'number',
  'currency',
  'option',
  'color',
  'bool',
];

const allowedOptionTypes = ['select', 'option'];

class RiskField extends Component {
  static propTypes = {
    fields: PropTypes.any,
    risk_fields: PropTypes.any,
  };

  constructor(props) {
    super(props);
    const { fields } = props;
    fields.push({ type: 'text' });
  }

  render() {
    const { fields, risk_fields: riskFields } = this.props;

    return (
      <div>
        {
          fields.map((field, index) => (
            <div className="form-row align-items-center" key={`riskFields_${index + index}`}>
              <div className="col-md-5">
                <Field
                  name={`${field}.name`}
                  label={`#${index + 1} Risk Field Name`}
                  type="text"
                  component={TextField}
                  validate={[required]}
                />
              </div>
              <div className="col-lg-5 col-md-5 col-sm-8 col-8">
                <Field
                  name={`${field}.type`}
                  label={`#${index + 1} Risk Field Type`}
                  type="text"
                  component={SelectInput}
                  options={riskFieldOptions}
                  validate={[required]}
                />
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2 col-2 d-flex justify-content-center">
                <AddNewButton fields={fields} type={{ type: 'text' }} />
              </div>
              <div className="col-lg-1 col-md-1 col-sm-2 col-2 d-flex justify-content-center">
                <RemoveButton fields={fields} index={index} />
              </div>
              {
                allowedOptionTypes.indexOf(riskFields[index].type) > -1 ? (
                  <div className="col-md-12 d-flex flex-column">
                    <FieldArray
                      name={`${field}.options`}
                      label={`#${index + 1} Risk Field Options`}
                      type="text"
                      component={RiskFieldOption}
                      fieldIndex={index}
                      validate={[required]}
                    />
                  </div>
                ) : null
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default formValues('risk_fields')(RiskField);
