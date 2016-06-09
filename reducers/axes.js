import * as types from '../constants/actions/axes.js';

const initialState = {
    x_axis: {
        scale_type: 'num',
        date_format: 'MM/DD/YYYY',
        time_format: 'HH:mm A'
    },
    y_axis: {
        scale_type: 'num',
        date_format: 'MM/DD/YYYY',
        time_format: 'HH:mm A'
    }
};

export default function axes(state = initialState, action) {
  let new_axis = {};
  switch(action.type) {
    case types.CHANGE_AXIS_SCALE_TYPE:
      new_axis[action.axis] = {...state[action.axis], scale_type: action.scale_type};
      return {...state, ...new_axis}

    case types.CHANGE_AXIS_DATE_FORMAT:
      new_axis[action.axis] = {...state[action.axis], date_format: action.date_format};
      return {...state, ...new_axis}

    case types.CHANGE_AXIS_TIME_FORMAT:
      new_axis[action.axis] = {...state[action.axis], time_format: action.time_format};
      return {...state, ...new_axis}

    default:
      return state;
  }
};
