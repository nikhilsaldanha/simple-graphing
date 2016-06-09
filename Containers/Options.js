import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, {Component, PropTypes } from 'react';
import AxesOptions from '../Components/AxesOptions.js';
import DimOptions from './DimOptions.js';

class Options extends Component {

  constructor() {

    super();
    this.updateAxes = this.updateAxes.bind(this);
    this.updateDim = this.updateDim.bind(this);
  }

  updateAxes(action) {
    this.props.update(action);
  }
  updateDim(action) {
    this.props.update(action);
  }

  render() {
    return (
      <div>
      <br /><br /><br /><hr /><br />
      <em>
        Choose the type of data on each axis
        (If no option is chosen, numerical will
        be assumed on both axes)
      </em>
      <br /><br />
      <AxesOptions id="x_axis"
                   LabelName="X Axis"
                   scale_types={this.props.scale_types}
                   date_formats={this.props.date_formats}
                   time_formats={this.props.time_formats}
                   updateAxes={this.updateAxes}
                   state={this.props.state.axes.x_axis}/>
      <br />
      <AxesOptions id="y_axis"
                   LabelName="Y Axis"
                   scale_types={this.props.scale_types}
                   date_formats={this.props.date_formats}
                   time_formats={this.props.time_formats}
                   updateAxes={this.updateAxes}
                   state={this.props.state.axes.y_axis}/>
      <br />
      <DimOptions state={this.props.state.dim} updateDim={this.updateDim} />
      </div>
    );
  }
}
Options.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  scale_types: React.PropTypes.array.isRequired,
  date_formats: React.PropTypes.array.isRequired,
  time_formats: React.PropTypes.array.isRequired
}
Options.defaultProps = {
  scale_types: [{name: 'Numerical', value: 'num'}, {name: 'Date', value: 'date'}, {name: 'Time', value: 'time'}, {name: 'Other', value: 'ord'}],
  date_formats: [{form: "MM/DD/YYYY", desc: "24/01/2012"}, {form: "MM/DD/YY", desc: "24/01/12"}, {form: "MMM DD YYYY", desc: "Jan 24 2012"}, {form: "D-MMM-YY", desc: "1-Jan-12(No trailing 0 for single digit days)"}],
  time_formats: [{form: "HH:mm", desc: "23:15"}, {form: "hh:mm A", desc: "11:15 pm"}]
}

export default Options;
