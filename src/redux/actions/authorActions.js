import * as actionType from '../actions/actionTypes';
import * as authorAPI from '../../api/authorApi';
import { apiCallBegin, apiCallCompleted } from './spinnerActions';

export function loadAuthorsSuccess(authors) {
  return { type: actionType.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return authorAPI
      .getAuthors()
      .then((authors) => {
        dispatch(apiCallCompleted());
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((err) => {
        dispatch(apiCallCompleted());
        throw err;
      });
  };
}
