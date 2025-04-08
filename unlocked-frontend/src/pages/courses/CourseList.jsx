

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  if (courses.length === 0) {
    return <h2>No available courses</h2>;
  }

  // Navigate to course details
  const handleViewCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="course-list">
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <button onClick={() => handleViewCourse(course.id)}>
            View Course
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
