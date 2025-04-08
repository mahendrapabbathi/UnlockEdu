package com.unlocked.unlocked.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unlocked.unlocked.models.Assessment;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Chapter {
    private String chapterId;
    private String title;
    private List<Module> modules;
    private boolean unlocked;
    private Assessment assessment;

    public Chapter() {}

    public Chapter(String chapterId, String title, List<Module> modules, boolean unlocked) {
        this.chapterId = chapterId;
        this.title = title;
        this.modules = modules;
        this.unlocked = unlocked;
    }

    public String getChapterId() {
        return chapterId;
    }

    public String getTitle() {
        return title;
    }

    public List<Module> getModules() {
        return modules;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }

    public Assessment getAssessment() {
        return assessment;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

}
