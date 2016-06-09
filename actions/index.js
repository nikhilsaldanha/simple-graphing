import * as types from '../constants/ActionTypes.js';

export function uploadData(data) {
    return {type: types.UPLOAD_DATA, data: data};
}

export function exchangeCols(data) {
    return {type: types.EXCHANGE_COLS, data: data};
}

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

export function changeAxisScaleType(axis, scale_type) {
    return {type: types.CHANGE_AXIS_SCALE_TYPE, axis: axis, scale_type: scale_type};
}

export function changeAxisDateFormat(axis, date_format) {
    return {type: types.CHANGE_AXIS_DATE_FORMAT, axis: axis, date_format: date_format};
}

export function changeAxisDateFormat(axis, time_format) {
    return {type: types.CHANGE_AXIS_TIME_FORMAT, axis: axis, time_format: time_format};
}