import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function spinnerReducer(
  state = initialState.API_Call_In_Progress,
  action
) {
  switch (action.type) {
    case types.BEGIN_API_CALL: {
      return (state = true);
    }

    case types.END_API_CALL: {
      console.log('aa');
      return (state = false);
    }
    default:
      return state;
  }
}
