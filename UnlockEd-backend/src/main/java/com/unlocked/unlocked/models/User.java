package com.unlocked.unlocked.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private List<String> enrolledCourses;
    private List<String> skills;

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(String name, String email, String password, List<String> enrolledCourses, List<String> skills) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.enrolledCourses = enrolledCourses;
        this.skills = skills;
    }


    public String getId() {
        return id;
    }
    public void setId(String id) { this.id = id; }

    public String getName() {
        return name;
    }
    public void setName(String name) { this.name = name; }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<String> getEnrolledCourses() {
        return enrolledCourses;
    }
    public void setEnrolledCourses(List<String> enrolledCourses) {
        this.enrolledCourses = enrolledCourses;
    }


    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
