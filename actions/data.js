import * as types from '../constants/actions/data.js';

export function uploadData(data) {
    return {type: types.UPLOAD_DATA, data: data};
}

export function exchangeCols(data) {
    return {type: types.EXCHANGE_COLS, data: data};
}