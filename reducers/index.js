import {combineReducers} from 'redux';
import './axes';
import './dim';
import './upload';

const rootReducer = combineReducers({
  upload,
  options: combineReducers({
    axes,
    dim
  })
});

export default rootReducer;