import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert('loading error' + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert('loading authors error' + error);
      });
    }
  }

  deleteCourseHandler = async (courseId) => {
    await this.props.actions.deleteCourse(courseId);
    toast.success(`Course deleted successfully!`);
  };

  render() {
    return (
      <>
        {this.props.showSpinner}
        {this.state.redirectToAddCoursePage && (
          <Redirect to="/course"></Redirect>
        )}
        {this.props.showSpinner ? (
          <Spinner />
        ) : (
          <>
            <h2>Courses</h2>

            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add New Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.deleteCourseHandler}
            ></CourseList>
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    showSpinner: state.spinner,
  };
};
const mapDespatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    deleteCourse: bindActionCreators(courseActions.deleteCurse, dispatch),
  },
});

// const mapDespatchToProps = {
//   cerateCourse: courseActions.cerateCourse,
// };

export default connect(mapStateToProps, mapDespatchToProps)(CoursesPage);
