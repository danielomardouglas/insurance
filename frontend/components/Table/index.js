import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/main.scss';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
      }),
    ).isRequired,
    rowData: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    action: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func,
      ]),
    ])
  };

  static defaultProps = {
    action: false,
  };

  render() {
    const { headers, rowData, action } = this.props;

    const Action = action;

    return (
      <table>
        <thead>
          <tr>
            { headers.map((h) => <th key={h.field}>{h.name}</th>) }
            { action ? <th className="action">Action</th> : null }
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((data) => (
              <tr key={`row${Object.values(data)[0]}`}>
                { headers.map((key) => (
                  <td key={key.field}>
                    {data[key.field]}
                  </td>
                ))}
                { action ? (
                  <td className="action">
                    <Action to={`/riskTypes/${data.id}`} />
                  </td>
                ) : null }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
