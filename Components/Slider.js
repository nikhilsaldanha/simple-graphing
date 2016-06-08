import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, { PropTypes } from 'react';

class Slider extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <label forName={this.props.id}>{this.props.label}</label>
        <input id={this.props.id}
               name={this.props.id}
               type="range"
               min={+this.props.min}
               max={+this.props.max}
               value={+this.props.value}
               onChange={this.props.updateSlider}
        />
        <input type="text" id={this.props.id} onChange={this.props.updateSlider} value={this.props.value} />
        {
          (()=>{

            if(this.props.default != undefined) {
              return (<input type="button" onClick={this.props.default} value="Default" />);
            }
          })()
        }
      </div>
    );
  }
}
Slider.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  updateSlider: React.PropTypes.func.isRequired
}
Slider.defaultProps = {
  min: 0,
  max: 1000
}

export default Slider;
