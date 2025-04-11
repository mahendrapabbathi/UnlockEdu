
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChapterDropdown from "./ChapterDropdown";
import "./CourseDetails.css";

const CourseDetail = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [assessmentAttempted, setAssessmentAttempted] = useState(false);
  const [assessmentPassed, setAssessmentPassed] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(null); // 👈 Track active chapter

  // Fetch course details
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}`
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const unlockNextChapter = async (courseId, chapterId, score) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/unlock/chapter`,
        { courseId, chapterId, score }
      );

      if (response.data === "Next chapter unlocked!") {
        setAssessmentPassed(true);
        await fetchCourseDetails();
      } else {
        console.warn("You need at least 70% to unlock the next chapter.");
        setAssessmentAttempted(true);
        setAssessmentPassed(false);
      }
    } catch (error) {
      console.error("Error unlocking chapter:", error);
    }
  };

  // Unlock the next module after completing module
  const unlockNextModule = async (courseId, chapterId, moduleId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/unlock/module`,
        { courseId, chapterId, moduleId }
      );

      if (response.data === "Next module unlocked!") {
        await fetchCourseDetails();
      } else {
        console.warn("Unable to unlock the next module. Try again.");
      }
    } catch (error) {
      console.error("Error unlocking module:", error);
    }
  };

  if (!course) {
    return <div className="loading">Loading course...</div>;
  }

  return (
    <div className="course-detail">
      <h2 className="course-title">{course.title || course.courseTitle}</h2>

      {course.chapters && course.chapters.length > 0 ? (
        course.chapters.map((chapter, index) => (
          <ChapterDropdown
            key={chapter.chapterId || chapter.id}
            chapter={chapter}
            courseId={courseId}
            unlockNextChapter={unlockNextChapter}
            unlockNextModule={unlockNextModule}
            assessmentAttempted={assessmentAttempted}
            assessmentPassed={assessmentPassed}
            isActive={activeChapterIndex === index} 
            setActiveChapterIndex={setActiveChapterIndex} 
            index={index} 
          />
        ))
      ) : (
        <div>No chapters available for this course.</div>
      )}
    </div>
  );
};

export default CourseDetail;
