import {UPLOAD_DATA, EXCHANGE_COLS} from '../constants/ActionTypes.js';

const initialState = {
    event: 'WAITING',
    data: []
};

export default function upload(state=initialState, action) {
  switch(action.type) {
    case UPLOAD_DATA:
      return {data: action.data, event: 'UPLOADED'};
    case EXCHANGE_COLS:
      return {data: action.data, event: 'UPLOADED'};
    default:
      return state;
  }
}