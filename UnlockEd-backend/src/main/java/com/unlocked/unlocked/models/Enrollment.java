package com.unlocked.unlocked.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enrollments")
public class Enrollment {
    @Id
    private String id;
    private String userId;
    private String courseId;

    public Enrollment() {}

    public Enrollment(String userId, String courseId) {
        this.userId = userId;
        this.courseId = courseId;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
