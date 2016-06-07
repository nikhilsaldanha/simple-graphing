import React from 'react';
import ReactDOM from 'react-dom';
import Visualize from './viz.js';
import {createStore} from 'redux';
import ReactFauxDom from 'react-faux-dom';
import d3 from 'd3';
import moment from 'moment';

class Graph extends React.Component {
  constructor() {
    super();
    this.scale = this.scale.bind(this);
    this.combineData = this.combineData.bind(this);
    this.avgDataLength = this.avgDataLength.bind(this);
  }
  avgDataLength(data, scale_type) {
    switch(scale_type) {
      case 'date':
        return 10;
      case 'time':
        return 10;
      case 'ord':
      case 'num':
        return d3.mean(data, d=>(''+d).length)
    }
  }
  combineData(xData, yData, keys) {
    let data = [];
    for (let i = 0; i < xData.length; i++) {
      let p = {};
      p[keys[0]] = xData[i];
      p[keys[1]] = yData[i];
      data.push(p);
    }
    return data;
  }
  scale(data, scale_type, date_format, time_format, axis_min, axis_max) {
    let scale;
		// For Ordinal Scale
		if(scale_type == "ord") {
			scale = d3.scale.ordinal()
						.domain(data)
						.rangeBands([axis_min, axis_max]);
      return [scale, data];
		}

		//For Time Scale
		else if(scale_type == "time") {
      data = data.map(d=>moment(d, time_format)._d);
      scale = d3.time.scale()
						.domain(d3.extent(data))
						.range([axis_min, axis_max]);
      return [scale, data];

    }

    //For Dates
    else if(scale_type == "date") {
      console.log(date_format)
      data = data.map(d=>moment(d, date_format)._d);
			scale = d3.time.scale()
						.domain(d3.extent(data))
						.range([axis_min, axis_max]);
      return [scale, data];
		}

		// //For Linear Scale
		else if(scale_type == "num") {
      data = data.map(d=>+d);
			scale = d3.scale.linear()
						.domain(d3.extent(data))
						.range([axis_min, axis_max]);
		}
    return [scale, data]
  }

  render () {
    let data = this.props.state.upload.data;
    let keys = d3.keys(this.props.state.upload.data[0]);

    let dim = this.props.state.options.dim;
    let width = dim.width;
    let height = dim.height;
    let margins = dim.margins;

    let axes = this.props.state.options.axes;
    let x_axis = axes.x_axis;
    let y_axis = axes.y_axis;
    let xData = data.map(d=>d[keys[0]]);
    let yData = data.map(d=>d[keys[1]]);
    let x, y;
    [x, xData] = this.scale(xData, x_axis.scale_type, x_axis.date_format, x_axis.time_format, 0, width);
    [y, yData] = this.scale(yData, y_axis.scale_type, y_axis.date_format, y_axis.time_format, height, 0);
    // data = [];
    data = this.combineData(xData, yData, keys);
    let xLen = this.avgDataLength(xData, x_axis.scale_type);

    var xAxis = d3.svg.axis().scale(x)
						                 .orient("bottom")
                             .ticks(width/(xLen*12));

		var yAxis = d3.svg.axis().scale(y)
    					               .orient("left")
                             .ticks(height/18);

    let svg = d3.select(new ReactFauxDom.Element('svg'));
    let canvas = svg.attr({
                  width: width+margins.left+margins.right,
                  height: height+margins.top+margins.bottom
                })
                // .append("g")
        				// .attr({
                //   "transform":"translate(" + margins.left + "," + margins.top + ")"});
                .append('g')
                  .attr({
                    transform: 'translate(' + margins.left + ', ' + margins.top + ')'
                  });
    // Add the X Axis
    canvas.append('g')
      .attr({
        class: 'x axis',
        transform: 'translate(' + margins.left + ', ' + height + ')'
      })
      .call(xAxis);

    // Add the Y Axis
    canvas.append('g')
       .attr({
         class: 'y axis',
         transform: 'translate(' + margins.left + ',0)'
       })
       .call(yAxis);
// Y Axis Text
   canvas.append("text")
           .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
           .attr("transform", "translate("+ (margins.left-40) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
           .text(keys[1]);

  // X Axis Text
   canvas.append('text')
       .attr('text-anchor', 'middle')  // this makes it easy to centre the text as the transform is applied to the anchor
       .attr('transform', 'translate('+ (margins.left+(width/2)) + ', ' + (height+40) + ')')  // centre below axis
       .text(keys[0]);

    let valueline = d3.svg.line()
											.x((d)=> {return x(d[keys[0]])+margins.left})
    									.y((d)=> {return y(+d[keys[1]])});
  	// Add the valueline path.
  	canvas.append('path')
  		 .attr('class', 'line')
			 .attr('d', valueline(data));

    let graph = svg.node().toReact();

    return (<div id="chart">{graph}</div>);
  }
}

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
              // console.log(this.props.default)
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
class DimOptions extends React.Component {
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
    let dim = this.props.state;
    this.props.updateDim({type: 'CHANGE_DIM', dim: {...dim, ...new_size}});
  }
  updateMargin(e) {
    let margins = this.props.state.margins;
    let new_margin = {...margins};
    let dim = this.props.state;
    new_margin[e.target.id] = +e.target.value;
    this.props.updateDim({type: 'CHANGE_DIM', dim: {...dim, margins: new_margin}})

  }
  defaultDim(type) {
    console.log(type)
    this.props.updateDim({type: type})
  }
  render () {
    return (
      <div>
        <Slider id="width" label="Width" min={200} max={1000} updateSlider={this.updateSize} value={this.props.state.width} default={()=>{this.props.updateDim({type: "DEFAULT_WIDTH"})}}/>
        <Slider id="height" label="Height" min={200 } max={1000} updateSlider={this.updateSize} value={this.props.state.height} default={()=>{this.props.updateDim({type: "DEFAULT_HEIGHT"})}}/>
        <Slider id="right" label="Right" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.state.margins.right} />
        <Slider id="top" label="Top" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.state.margins.top} />
        <Slider id="left" label="Left" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.state.margins.left} />
        <Slider id="bottom" label="Bottom" min={0} max={1000} updateSlider={this.updateMargin} value={this.props.state.margins.bottom} />
        <input type="button" onClick={()=>{this.props.updateDim({type: "DEFAULT_MARGINS"})}} value="Default Margins" />
        <input type="button" onClick={()=>{this.props.updateDim({type: "DEFAULT_DIM"})}} value="Default Dimensions" />

      </div>
    );
  }
}

class AxesOptions extends React.Component {

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
              switch(this.props.state.scale_type) {
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
class Options extends React.Component {

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
class App extends React.Component {

  constructor() {

    super();
    this.fileUpload = this.fileUpload.bind(this);
    this.interchange = this.interchange.bind(this);
  }
  interchange(e) {
    let data = this.props.state.upload.data;
    let keys = d3.keys(data[0]);
    let new_data = data.map((d)=>{
      let r = {};
      r[keys[1]] = d[keys[1]];
      r[keys[0]] = d[keys[0]];
      return r;
    })
    this.props.Dispatch({type: 'EXCHANGE', data: new_data});
  }
  fileUpload(e) {

    let reader = new FileReader();
    let file = document.getElementById(this.props.id).files[0];
    reader.onload = (e) => {
      this.props.Dispatch({type: 'UPLOADED', data: d3.csv.parse(e.target.result)});
    }
    reader.readAsText(file);
  }
  render() {
    return (
      <div>
        <input type="file"
               id={this.props.id}
               onChange={this.fileUpload}>
        </input>
        {(() => {
          console.log(this.props.state.upload);
          if(this.props.state.upload.event == 'UPLOADED') {
            return (<input type="button" value="Interchange Axes" onClick={this.interchange} />);
          }
        })()}
        <CSVTable store={this.props.state.upload} />
        <Options update={this.props.Dispatch}
                 state={this.props.state.options} />
       <Graph state={this.props.state}/>
      </div>
      );
    }
}

const upload = (state={event: 'WAITING', data: []}, action)=>{
  switch(action.type) {
    case 'UPLOADED':
      return {data: action.data, event: action.type};
    case 'EXCHANGE':
      return {data: action.data, event: 'UPLOADED'};
    default:
      return state;
  }
}

const axes = (state = {
                        x_axis: {
                          scale_type: "num",
                          date_format: "MM/DD/YYYY",
                          time_format: "HH:mm A"
                        },
                        y_axis: {
                          scale_type: "num",
                          date_format: "MM/DD/YYYY",
                          time_format: "HH:mm A"
                        }
                      }, action) => {
  let new_axis = {};
  switch(action.type) {
    case 'CHANGE_AXIS_SCALE_TYPE':
      new_axis[action.axis] = {...state[action.axis], scale_type: action.scale_type};
      return {...state, ...new_axis}

    case 'CHANGE_AXIS_DATE_FORMAT':
      new_axis[action.axis] = {...state[action.axis], date_format: action.date_format};
      return {...state, ...new_axis}

    case 'CHANGE_AXIS_TIME_FORMAT':
      new_axis[action.axis] = {...state[action.axis], time_format: action.time_format};
      return {...state, ...new_axis}

    default:
      return state;
  }
};

const dim = (state = {width: 0, height: 0, margins: {top:0, right: 0, bottom: 0, left: 0}}, action) => {
  switch(action.type) {
    case 'CHANGE_DIM':
      let new_dim = action.dim;
      return {...state, ...new_dim}
    case 'DEFAULT_WIDTH':
      return {...state, width: 600}
    case 'DEFAULT_HEIGHT':
      return {...state, height: 270}
    case 'DEFAULT_MARGINS':
      return {...state, margins: {top: 80, right: 100, bottom: 80, left: 40}}
    case 'DEFAULT_DIM':
      return {
        width: 600,
        height: 270,
        margins: {
          top: 80,
          right: 100,
          bottom: 80,
          left: 40
        }
      }
    default:
      return state;
  }
};

const options = (state = {}, action) => {
  return {
    axes: axes(state.axes, action),
    dim: dim(state.dim, action)
  };
}

const app = (state = {}, action) => {
  return {
    upload: upload(state.upload, action),
    options: options(state.options, action)
  }
}

const store = createStore(app);

const AppRender = () => {
  ReactDOM.render(
    <App state={store.getState()}
         id='file-upload-button'
         Dispatch={(action) => {store.dispatch(action)}}
    />,
    document.getElementById('app')
  );
};

store.subscribe(AppRender);
AppRender();

export default App;
