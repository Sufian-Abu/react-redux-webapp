import React from 'react';
import CourseForm from './CourseForm';
import { cleanup, render } from 'react-testing-library';

afterEach(cleanup);

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => { },
        onChange: () => {},
    }
    const props = { ...defaultProps, ...args }
    return render(<CourseForm {...props} />);
}

it('should render Add Course header', () => {
    const { getByText } = renderCourseForm();
    getByText("Add Course");
})

it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText("Save");
})

it('should label save button as "Saving..." when it is saving', () => {
    const { getByText } = renderCourseForm({saving: true});
    getByText("Saving...");
})