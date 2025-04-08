package com.unlocked.unlocked.repositories;

import com.unlocked.unlocked.models.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
}
