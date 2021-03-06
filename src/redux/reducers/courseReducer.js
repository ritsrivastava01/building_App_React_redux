import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.courses, action) => {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    case types.CREATE_COURSE_SUCCESS: {
      return [...state, { ...action.course }];
    }
    case types.UPDATE_COURSE_SUCCESS: {
      return state.map((x) => (x.id === action.course.id ? action.course : x));
    }
    case types.DELETE_COURSE_SUCCESS: {
      return state.filter((x) => x.id !== action.courseId);
    }
    default:
      return state;
  }
};
