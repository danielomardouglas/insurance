import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    rowData: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    action: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
    ])
  };

  static defaultProps = {
    action: false,
  };

  render() {
    const { headers, rowData, action } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {
              headers.map((header) => (
                <th key={header}>{header}</th>
              ))
            }
            {
              action ? (
                <th className="action">Action</th>
              ) : null
            }
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((data) => (
              <tr key={`row${Object.values(data)[0]}`}>
                {
                  headers.map((key) => (
                    <td key={data[key]}>{data[key]}</td>
                  ))
                }
                {
                  action ? <td className="action">{action}</td> : null
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
