import {CHANGE_DIM, DEFAULT_DIM, DEFAULT_HEIGHT, DEFAULT_MARGINS, DEFAULT_WIDTH} from '../constants/ActionTypes.js';

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

const dim = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_DIM:
      return {...state, ...action['dim']};

    case DEFAULT_WIDTH:
      return {...state, width: 600};

    case DEFAULT_HEIGHT:
      return {...state, height: 270};

    case DEFAULT_MARGINS:
      return {...state, margins: {top: 80, right: 100, bottom: 80, left: 40}};

    case DEFAULT_DIM:
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
