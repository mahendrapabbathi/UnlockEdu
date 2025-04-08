


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Dhero from '../../Course_components/DHero/Dhero'
import CourseCard from "../courses/CourseCard";
import DNavbar from "../../Course_components/DNavbar";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
    <div className="dashboard">
      <DNavbar/>
      <Dhero />
      <hr />

      <h2 className="dashboard-title">Available Courses</h2>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.courseId || course.id}
              course={course}
              onViewCourse={() => navigate(`/courses/${course.courseId || course.id}`)}
            />
          ))
        ) : (
          <p>No available courses.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
