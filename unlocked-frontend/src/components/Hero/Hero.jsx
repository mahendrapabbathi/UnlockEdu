
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Hero.css";

const Hero = ({ setLogin }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
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

  const viewAllCourses = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      setLogin(true);
    }
  };

  const handleCourseClick = (courseId) => {
    if (token) {
      navigate(`/courses/${courseId}`);
    } else {
      setLogin(true); 
    }
  };

  return (
    <div className="hero-container">
      {/* Left Side - Hero Section */}
      <div className="heading">
        <p className="heading-text">The All-In-One Learning Platform</p>
        <p className="heading-para">
          Unlock your coding potential with our interactive programming courses,
          designed for beginners and experts alike. Learn in-demand skills
          through hands-on projects, real-world applications, and expert
          guidance.
        </p>
        <button onClick={viewAllCourses}>View All Courses</button>
      </div>

      {/* Right Side - Skills Section */}
      <div className="skills-content">
        <ul>
          {courses.slice(0,4).map((course,index) => (
            <div key={index} className="courses">
              <li
                key={course.courseId || course.id}
                className="course-item"
                onClick={() => handleCourseClick(course.courseId || course.id)}
              >
                {course.title}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
