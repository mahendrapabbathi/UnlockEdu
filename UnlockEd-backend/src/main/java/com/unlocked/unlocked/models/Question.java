package com.unlocked.unlocked.models;

import java.util.List;

public class Question {
    private String questionId;
    private String question;
    private List<String> options;
    private String correctAnswer;
    private String userAnswer;

    public Question() {}

    public Question(String question, List<String> options, String correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.userAnswer = null;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId() {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public List<String> getOptions() {
        return options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public boolean isCorrect() {
        return correctAnswer.equals(userAnswer);
    }
}
