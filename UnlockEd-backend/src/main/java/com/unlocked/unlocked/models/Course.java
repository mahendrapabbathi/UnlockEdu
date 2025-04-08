package com.unlocked.unlocked.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "courses") // Ensures mapping to the "courses" collection in MongoDB
public class Course {
    @Id
    private String id;
    private String title;
    private String description;
    private List<Chapter> chapters;

    public Course() {}

    public Course(String title, List<Chapter> chapters) {
        this.title = title;
        this.chapters = chapters;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {  // Ensure ID is set if needed
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }
}
