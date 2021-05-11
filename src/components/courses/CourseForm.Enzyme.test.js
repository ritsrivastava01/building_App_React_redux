import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

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
  return shallow(<CourseForm {...props} />);
};

it('should render the form and header', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it(`should render the save button with 'save' text`, () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('button').text()).toBe('Save');
});
it(`should render the save button with 'save...' when save`, () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find('button').text()).toBe('Saving...');
});
