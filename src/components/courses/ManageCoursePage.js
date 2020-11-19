import React, { useEffect, useState}from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse} from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';

function ManageCoursePage({ courses, authors, loadAuthors, saveCourse, history, loadCourses, ...props}) {
  const [course, setCourse] = useState({ ...props.course }); 
  const [errors, setErrors] = useState({}); 
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading course failed" + error);
      });
    } else {
      setCourse({...props.course})
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }  
  }, [props.course])

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }))
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }
    
  return (
    (authors.length === 0 || courses.length === 0) ? <Spinner /> : (
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
        />
    )
  )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0
    ? getCourseBySlug(state.courses, slug)
    : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
