import * as types from '../constants/actions/dim.js';

export function defaultDim() {
    return {type: types.DEFAULT_DIM};
}

export function changeDim(dim) {
    return {type: types.CHANGE_DIM};
}

export function defaultMargins() {
    return {type: types.DEFAULT_MARGINS};
}

export function defaultWidth() {
    return {type: types.DEFAULT_WIDTH};
}

export function defaultHeight() {
    return {type: types.DEFAULT_HEIGHT};
}