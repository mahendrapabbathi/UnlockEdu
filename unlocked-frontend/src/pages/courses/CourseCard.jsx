

import React, { useState, useEffect } from "react";
import "./CourseCard.css";

// Function to generate a random color dynamically
const getRandomColor = () => {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 80%, 70%)`; // Bright and pleasant colors
  return randomColor;
};

const CourseCard = ({ course, onViewCourse }) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(getRandomColor()); // Generate a random color for each course card
  }, []);

  return (
    <div className="component">
      <div className="course-card" style={{ backgroundColor: bgColor }}>
        <h1>{course.title}</h1>
        <h3>{course.name}</h3>
        <p className="description">{course.description}</p>
        <button className="course-btn" onClick={onViewCourse}>View Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
