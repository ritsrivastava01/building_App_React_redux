import React from 'react';
import CourseForm from './CourseForm';
import { cleanup, render } from 'react-testing-library';

afterEach(cleanup);
const renderCourseForm = (args) => {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };
  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
};

it('should render the form and header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it(`should render the save button with 'save' text`, () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});
it(`should render the save button with 'saving...' when save`, () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
