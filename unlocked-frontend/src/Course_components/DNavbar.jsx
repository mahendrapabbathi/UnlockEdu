import React, { useState, useEffect } from "react";
import "./DNavbar.css";
import { useNavigate } from "react-router-dom";

const DNavbar = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="dNavbar">
      <ul>
        {courses.map((course) => (
          <li
            key={course.courseId || course.id}
            onClick={() => navigate(`/courses/${course.courseId || course.id}`)}
          >
            <li>{course.title}</li>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DNavbar;
