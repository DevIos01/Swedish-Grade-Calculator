import React, { useState } from 'react';
import Navbar from './Navbar';
import CourseForm from './CourseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const grades = ['A', 'B', 'C', 'D', 'E', 'F'];
  const gradeValues = {
    A: 20, B: 17.5, C: 15, D: 12.5, E: 10, F: 0
  };
  const meritCourses = ['Matematik 4', 'Engelska 7'];
  const meritPointPerCourse = 1.0;

  const [courses, setCourses] = useState([
    { id: 1, name: 'Dator- och nätverksteknik', points: 100, grade: 'C' },
    { id: 2, name: 'Engelska 5', points: 100, grade: 'C' },
    { id: 3, name: 'Engelska 6', points: 100, grade: 'C' },
    { id: 4, name: 'Fysik 1a', points: 150, grade: 'C' },
    { id: 5, name: 'Historia 1a1', points: 50, grade: 'C' },
    { id: 6, name: 'Idrott och hälsa 1', points: 100, grade: 'C', isHighlighted: true },
    { id: 7, name: 'Matematik 1c', points: 100, grade: 'C' },
    { id: 8, name: 'Matematik 2c', points: 100, grade: 'C' },
    { id: 9, name: 'Matematik 3c', points: 100, grade: 'C' },
    { id: 10, name: 'Programmering 1', points: 100, grade: 'C' },
    { id: 11, name: 'Programmering 2', points: 100, grade: 'C' },
    { id: 12, name: 'Robotteknik', points: 100, grade: 'C' },
    { id: 13, name: 'Samhällskunskap 1b', points: 100, grade: 'C' },
    { id: 14, name: 'Svenska som andraspråk 1', points: 100, grade: 'C', isHighlighted: true },
    { id: 15, name: 'Svenska som andraspråk 2', points: 100, grade: 'C' },
    { id: 16, name: 'Teknik 1', points: 150, grade: 'C' },
    { id: 17, name: 'Teknik 2', points: 100, grade: 'C' },
    { id: 18, name: 'Individual Program ( Retorik, Idrott 2, Ungdomscultur )', points: 100, grade: 'C' },
    { id: 19, name: 'Fysik 2', points: 100, grade: 'C' },
    { id: 20, name: 'Matematik 4', points: 100, grade: 'C', isHighlighted: true },
    { id: 21, name: 'Religionskunskap 1', points: 50, grade: 'C' },
    { id: 22, name: 'Svenska som andraspråk 3', points: 100, grade: 'C' },
    { id: 23, name: 'Tillämpad programmering', points: 100, grade: 'C' },
    { id: 24, name: 'Kemi 1', points: 100, grade: 'C', isHighlighted: true },
    { id: 25, name: 'Engelska 7', points: 100, grade: 'C' },
  ]);


  const [newCourseName, setNewCourseName] = useState('');
  const [newCoursePoints, setNewCoursePoints] = useState(100);
  const [newCourseGrade, setNewCourseGrade] = useState('C');

  const [total, setTotal] = useState({
    withoutMerit: 0,
    withMerit: 0,
    meritPoints: 0
  });

  const calculateTotal = () => {
    const filteredCourses = courses.filter(course => !meritCourses.includes(course.name));
    const totalNonMeritPoints = filteredCourses.reduce((acc, course) => acc + course.points, 0);
    const totalNonMeritValue = filteredCourses.reduce((acc, course) => acc + (gradeValues[course.grade] * course.points), 0);
    const averageWithoutMerit = totalNonMeritValue / totalNonMeritPoints;

    const additionalMerit = courses.filter(course => meritCourses.includes(course.name) && course.grade !== 'F')
      .reduce((acc, course) => acc + meritPointPerCourse, 0);

    setTotal({
      withoutMerit: averageWithoutMerit.toFixed(2),
      withMerit: (averageWithoutMerit + additionalMerit).toFixed(2),
      meritPoints: additionalMerit
    });
  };

  const handleAddCourse = () => {
    const newCourse = {
      id: Math.max(0, ...courses.map(c => c.id)) + 1,
      name: newCourseName,
      points: newCoursePoints,
      grade: newCourseGrade
    };
    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setNewCoursePoints(100);
    setNewCourseGrade('C');
  };

  const handleGradeChange = (id, newGrade) => {
    setCourses(courses.map(course => course.id === id ? { ...course, grade: newGrade } : course));
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="container">
      <Navbar />
      {courses.map(course => (
        <CourseForm
          key={course.id}
          course={course}
          grades={grades}
          onGradeChange={handleGradeChange}
          onDeleteCourse={handleDeleteCourse}
        />
      ))}
      <div className="add-course-form">
        <input type="text" value={newCourseName} onChange={e => setNewCourseName(e.target.value)} placeholder="Course Name" className="form-control" />
        <input type="number" value={newCoursePoints} onChange={e => setNewCoursePoints(e.target.value)} placeholder="Points" className="form-control" />
        <select value={newCourseGrade} onChange={e => setNewCourseGrade(e.target.value)} className="form-control">
          {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
        </select>
        <button onClick={handleAddCourse} className="btn btn-primary">Lägg till kurs</button>
      </div>
      <button className="btn calculate-button" onClick={calculateTotal}>Beräkna</button>
      <div className="results">
        <h2>Totalt genomsnitt utan meritkurser: {total.withoutMerit}</h2>
        <h2>Totalt genomsnitt med meritkurser: {total.withMerit}</h2>
        <h2>Ytterligare meritpoäng: {total.meritPoints}</h2>
      </div>
    </div>
  );
}

export default App;