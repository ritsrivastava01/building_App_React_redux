import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import spinner from './spinnerReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  spinner,
});

export default rootReducer;
