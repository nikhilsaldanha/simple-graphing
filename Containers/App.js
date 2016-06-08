import React from 'react';
import ReactDOM from 'react-dom';

import Options from './Options.js';
import Graph from '../Components/Graph.js';
import CSVTable from '../Components/CSVTable.js';

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

export default App;
