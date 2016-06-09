import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';
import {createStore, combineReducers} from 'redux';

const upload = (state={event: 'WAITING', data: []}, action)=>{
  switch(action.type) {
    case 'UPLOAD_DATA':
      return {data: action.data, event: 'UPLOADED'};
    case 'EXCHANGE_COLS':
      return {data: action.data, event: 'UPLOADED'};
    default:
      return state;
  }
}

const axes = (state = {x_axis: {scale_type: "num",date_format: "MM/DD/YYYY",time_format: "HH:mm A"}, y_axis: {scale_type: "num", date_format: "MM/DD/YYYY", time_format: "HH:mm A"}}, action) => {
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


// const options = (state = {}, action) => {
//   return {
//     axes: axes(state.axes, action),
//     dim: dim(state.dim, action)
//   };
// }

const app = combineReducers({
  upload,
  options: combineReducers({
    axes,
    dim
  })
});

// const app = (state = {}, action) => {
//   return {
//     upload: upload(state.upload, action),
//     options: options(state.options, action)
//   }
// }

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
