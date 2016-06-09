import {combineReducers} from 'redux';
import axes from './axes';
import dim from './dim';
import upload from './upload';

const rootReducer = combineReducers({
  upload,
  options: combineReducers({
    axes,
    dim
  })
});

export default rootReducer;