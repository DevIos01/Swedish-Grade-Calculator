import React from 'react';

const CourseForm = ({ course, grades, onGradeChange, onDeleteCourse }) => {
  return (
    <div className="course-form">
      <div>
        <div className="course-header">
          {course.name} ({course.points} points)
        </div>
        <div className="grade-buttons">
          {grades.map(grade => (
            <button
              key={grade}
              type="button"
              className={`btn btn-grade ${grade === course.grade ? 'selected' : ''}`}
              onClick={() => onGradeChange(course.id, grade)}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>
      <button 
        type="button" 
        className="btn btn-danger delete-button" 
        onClick={() => onDeleteCourse(course.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default CourseForm;