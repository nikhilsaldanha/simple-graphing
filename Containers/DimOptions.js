import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, {Component, PropTypes } from 'react';
import Slider from '../components/Slider.js';

class DimOptions extends Component {
  constructor() {
    super();
    this.updateSize = this.updateSize.bind(this);
    this.updateMargin = this.updateMargin.bind(this);
    this.defaultDim = this.defaultDim.bind(this);
  }
  componentDidMount() {
    this.props.updateDim({type: 'DEFAULT_DIM'});
  }
  updateSize(e) {
    let new_size = {};
    new_size[e.target.id] = +e.target.value;
    let dim = this.props.options;
    this.props.updateDim({type: 'CHANGE_DIM', dim: {...dim, ...new_size}});
  }
  updateMargin(e) {
    let margins = this.props.options.margins;
    let new_margin = {...margins};
    let dim = this.props.options;
    new_margin[e.target.id] = +e.target.value;
    this.props.updateDim({type: 'CHANGE_DIM', dim: {...dim, margins: new_margin}})

  }
  defaultDim(type) {
    this.props.updateDim({type: type})
  }
  render () {
    return (
      <div>
        <Slider id="width" label="Width" min={200} max={1000} updateSlider={this.updateSize} value={this.props.options.width} default={()=>{this.props.updateDim({type: "DEFAULT_WIDTH"})}}/>
        <Slider id="height" label="Height" min={200 } max={1000} updateSlider={this.updateSize} value={this.props.options.height} default={()=>{this.props.updateDim({type: "DEFAULT_HEIGHT"})}}/>
        <Slider id="right" label="Right" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.options.margins.right} />
        <Slider id="top" label="Top" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.options.margins.top} />
        <Slider id="left" label="Left" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.options.margins.left} />
        <Slider id="bottom" label="Bottom" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.options.margins.bottom} />
        <input type="button" onClick={()=>{this.props.updateDim({type: "DEFAULT_MARGINS"})}} value="Default Margins" />
        <input type="button" onClick={()=>{this.props.updateDim({type: "DEFAULT_DIM"})}} value="Default Dimensions" />

      </div>
    );
  }
}

export default DimOptions;
