import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

import './styles/main.scss';


class ColorField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
  };

  state = {
    displayColorPicker: false,
    color: '#0090c1',
  };

  componentDidMount() {
    const { color } = this.state;
    this.handleChange({ hex: color });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { input } = this.props;
    const { onChange } = input;
    onChange(color.hex);
    this.setState({ color: color.hex });
  };

  render() {
    const {
      label
    } = this.props;

    const {
      color,
    } = this.state;

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}
          <div>
            <div className="swatch" onClick={() => this.handleClick()}>  {/* eslint-disable-line */}
              <div className="color" style={{ background: color }} />
            </div>
            {
              this.state.displayColorPicker ? (
                <div className="popover">
                  <div className="cover" onClick={() => this.handleClose()} />  {/* eslint-disable-line */}
                  <ChromePicker
                    disableAlpha
                    color={this.state.color}
                    onChange={(c) => this.handleChange(c)}
                  />
                </div>
              ) : null
            }
          </div>
        </label>
      </div>
    );
  }
}

export default ColorField;
