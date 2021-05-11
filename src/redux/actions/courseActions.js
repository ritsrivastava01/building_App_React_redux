import * as types from './actionTypes';
import * as courseAPI from '../../api/courseApi';
import { apiCallBegin, apiCallCompleted } from './spinnerActions';

export function cerateCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}
export function UpdateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function CreateCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(courseId) {
  return { type: types.DELETE_COURSE_SUCCESS, courseId };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return courseAPI
      .getCourses()
      .then((courses) => {
        dispatch(apiCallCompleted());
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((err) => {
        dispatch(apiCallCompleted());
        throw err;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return courseAPI
      .saveCourse(course)
      .then((savedCourse) => {
        dispatch(apiCallCompleted());
        course.id
          ? dispatch(UpdateCourseSuccess(savedCourse))
          : dispatch(CreateCourseSuccess(savedCourse));
      })
      .catch((err) => {
        dispatch(apiCallCompleted());
        throw err;
      });
  };
}

export function deleteCurse(courseId) {
  return function (dispatch) {
    return courseAPI
      .deleteCourse(courseId)
      .then((x) => {
        dispatch(apiCallCompleted());
        dispatch(deleteCourseSuccess(courseId));
      })
      .catch((err) => {
        dispatch(apiCallCompleted());
        throw err;
      });
  };
}
