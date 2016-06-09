import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Options from './Options';
import Graph from '../Components/Graph';
import CSVTable from '../Components/CSVTable';
import * as actions from '../actions/data';
 
class App extends Component {

  constructor() {

    super();
    this.fileUpload = this.fileUpload.bind(this);
    this.interchange = this.interchange.bind(this);
  }
  interchange(e) {
    let data = this.props.upload.data;
    let keys = d3.keys(data[0]);
    let new_data = data.map((d)=>{
      let r = {};
      r[keys[1]] = d[keys[1]];
      r[keys[0]] = d[keys[0]];
      return r;
    })
    this.props.Dispatch({type: 'EXCHANGE_COLS', data: new_data});
  }
  fileUpload(e) {

    let reader = new FileReader();
    let file = document.getElementById(this.props.id).files[0];
    reader.onload = (e) => {
      this.props.update({type: 'UPLOAD_DATA', data: d3.csv.parse(e.target.result)});
    }
    reader.readAsText(file);
  }
  render() {
    let { id, upload, update, options } = this.props;
    return (
      <div>
        <input id={id}
               type="file"
               onChange={this.fileUpload}>
        </input>
        {(() => {
          if(upload.event == 'UPLOADED') {
            return (<input type="button" value="Interchange Axes" onClick={this.interchange} />);
          }
        })()}
        <CSVTable data={upload} />
        <Options update={update}
                 options={options} />
        <Graph config={{upload, options}}/>
      </div>
      );
    }
}

const mapStateToProps = (state, id) => ({
  id,
  upload: state.upload,
  options: state.options
})

const mapDispatchToProps = (dispatch) => ({
  update: (action) => {
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)