import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, { Component, PropTypes } from 'react';


class AxesOptions extends Component {

  constructor() {

    super();
    this.updateScale = this.updateScale.bind(this);
    this.updateDateFormat = this.updateDateFormat.bind(this);
    this.updateTimeFormat = this.updateTimeFormat.bind(this);
    this.date_desc = "";
    this.time_desc = "";
  }

  updateScale(e) {
    if(e.target.value == 'date')
      this.date_desc = this.props.date_formats[0]['desc'];
    if(e.target.value == 'time')
      this.time_desc = this.props.time_formats[0]['desc'];
    this.props.updateAxes(
      {
        type: 'CHANGE_AXIS_SCALE_TYPE',
        axis: this.props.id,
        scale_type: e.target.value
      }
    );
  }
  updateDateFormat(e) {
    let ele = e.target;
    this.date_desc = this.props.date_formats[ele.value]['desc'];
    this.props.updateAxes(
      {
        type: 'CHANGE_AXIS_DATE_FORMAT',
        axis: this.props.id,
        date_format: ele[ele.value].text
      }
    );
  }
  updateTimeFormat(e) {
    let ele = e.target;
    this.time_desc = this.props.time_formats[ele.value]['desc'];
    this.props.updateAxes(
      {
        type: 'CHANGE_AXIS_TIME_FORMAT',
        axis: this.props.id,
        time_format: ele[ele.value].text
      }
    );
  }

  render() {
    return (
      <div id={this.props.id}>
        <div id="scale-type">
          <label htmlFor={this.props.id}>{this.props.LabelName}</label>
          <select id={this.props.id} name={this.props.id} onChange={this.updateScale}>
          {
            this.props.scale_types.map(
              (type, i)=>
                <option key={i} value={type.value}>{type.name}</option>
            )
          }
          </select>
          {
            (() => {
              switch(this.props.options.scale_type) {
                case 'date':
                  return (
                    <span>
                      <select id="date_format" onChange={this.updateDateFormat}>
                      {
                        this.props.date_formats.map(
                          (form, i)=>
                            <option key={i} value={i}>{form['form']}</option>
                        )
                      }
                      </select>
                      <span>{this.date_desc}</span>
                    </span>
                  );
                case 'time':
                  return (
                      <span>
                        <select id="time_format" onChange={this.updateTimeFormat}>
                        {
                          this.props.time_formats.map(
                            (t, i)=>
                              <option key={i} value={i}>{t['form']}</option>
                          )
                        }
                        </select>
                        <span>{this.time_desc}</span>
                      </span>
                  );
              }
            })()
          }
          <br />
        </div>
      </div>
    );
  }
}

export default AxesOptions;
