package com.unlocked.unlocked.service;

import com.unlocked.unlocked.models.Course;
import com.unlocked.unlocked.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public Course getCourseById(String courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public void saveCourse(Course course) {
        courseRepository.save(course);
    }
}
