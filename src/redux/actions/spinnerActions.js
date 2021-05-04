import * as types from './actionTypes';

export function apiCallBegin() {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallCompleted() {
  return { type: types.END_API_CALL };
}
