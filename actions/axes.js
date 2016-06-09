import * as types from '../constants/actions/axes.js';

export function changeAxisScaleType(axis, scale_type) {
    return {type: types.CHANGE_AXIS_SCALE_TYPE, axis: axis, scale_type: scale_type};
}

export function changeAxisDateFormat(axis, date_format) {
    return {type: types.CHANGE_AXIS_DATE_FORMAT, axis: axis, date_format: date_format};
}

export function changeAxisDateFormat(axis, time_format) {
    return {type: types.CHANGE_AXIS_TIME_FORMAT, axis: axis, time_format: time_format};
}