package com.unlocked.unlocked.models;

import java.util.List;

public class Module {
    private String moduleId;
    private String title;
    private String content;
    private List<Question> questions;
    private boolean unlocked;

    public Module() {}

    public Module(String moduleId, String title, String content, List<Question> questions, boolean unlocked) {
        this.moduleId = moduleId;
        this.title = title;
        this.content = content;
        this.questions = questions;
        this.unlocked = unlocked;
    }

    public String getModuleId() {
        return moduleId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }
}
