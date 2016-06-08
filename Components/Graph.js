import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import React, { PropTypes } from 'react';
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

export default Graph;
