package com.unlocked.unlocked.repositories;

import com.unlocked.unlocked.models.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUserId(String userId);
    void deleteByUserIdAndCourseId(String userId, String courseId);
}
