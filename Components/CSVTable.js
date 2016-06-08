import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, { PropTypes } from 'react';

class CSVTable extends React.Component {

  constructor() {

    super();
  }

  render() {
    let data = this.props.store.data;
    let keys=d3.keys(data[0]);
    return (
      <table>
        <thead>
          <tr>
          {
            keys.map((key, i) => <th key={i}>{key}</th>)
          }
          </tr>
        </thead>
        <tbody>
        {
          data.map(
            (d, i) =>
              <tr key={i}>
                {keys.map((key, j) => <td key={j}>{d[key]}</td>)}
              </tr>
          )
        }
        </tbody>
      </table>
    );
  }
}

export default CSVTable;
