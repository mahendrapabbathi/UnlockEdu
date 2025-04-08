
package com.unlocked.unlocked.models;

//import com.unlocked.unlocked.models.Question;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

public class Assessment {
    private List<Question> questions;

    public Assessment() {
    }

    public Assessment(List<Question> questions) {
        this.questions = questions;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}

