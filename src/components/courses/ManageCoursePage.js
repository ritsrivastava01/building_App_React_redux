import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { newCourse } from '../../../tools/mockData';
import CourseForm from './CourseForm';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  spinner,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setCourse({ ...props.course });
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('loading error' + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('loading authors error' + error);
      });
    }
  }, [props.course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((preCourse) => ({
      ...preCourse,
      [name]: name === 'authorId' ? parseInt(value) : value,
    }));
  };
  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = 'Title is missing';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const saveHandler = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    saveCourse(course)
      .then(() => {
        history.push('/courses');
        toast.success('Course Saved!');
      })
      .catch((error) => {
        setErrors({ onSave: error.message });
      });
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner></Spinner>
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={saveHandler}
      saving={spinner}
    ></CourseForm>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  spinner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? state.courses.find((x) => x.slug === slug) || null
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
    spinner: state.spinner,
  };
};
const mapDespatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

// const mapDespatchToProps = {
//   cerateCourse: courseActions.cerateCourse,
// };

export default connect(mapStateToProps, mapDespatchToProps)(ManageCoursePage);
