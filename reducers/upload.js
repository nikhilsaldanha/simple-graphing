import * as types from '../constants/actions/data.js';

const initialState = {
    event: 'WAITING',
    data: []
};

export default function upload(state=initialState, action) {
  switch(action.type) {
    case types.UPLOAD_DATA:
      return {data: action.data, event: 'UPLOADED'};
    case types.EXCHANGE_COLS:
      return {data: action.data, event: 'UPLOADED'};
    default:
      return state;
  }
}