import * as types from '../constants/actions/dim.js';

const initialState = {
    width: 0,
    height: 0,
    margins: {
        top:0,
        right: 0,
        bottom: 0,
        left: 0
    }
};

export default function dim(state = initialState, action) {
  switch(action.type) {
    case types.CHANGE_DIM:
      return {...state, ...action['dim']};

    case types.DEFAULT_WIDTH:
      return {...state, width: 600};

    case types.DEFAULT_HEIGHT:
      return {...state, height: 270};

    case types.DEFAULT_MARGINS:
      return {...state, margins: {top: 80, right: 100, bottom: 80, left: 40}};

    case types.DEFAULT_DIM:
      return {
        width: 600,
        height: 270,
        margins: {
          top: 80,
          right: 100,
          bottom: 80,
          left: 40
        }
      };
      
    default:
      return state;
  }
};
