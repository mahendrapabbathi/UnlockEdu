
import React, { useState } from "react";
import "./ModuleDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assessment = ({ assessment, unlockNextChapter, courseId, chapterId }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  //  user's answers
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Calculating score
  const calculateScore = () => {
    let correctAnswers = 0;
    assessment.questions.forEach((question) => {
      if (answers[question.questionId] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / assessment.questions.length) * 100;
  };

  // Submit answers
  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    if (finalScore >= 70) {
      toast.success(`🎉 Great job! You scored ${finalScore}%. Unlocking next chapter...`);
      try {
        await unlockNextChapter(courseId, chapterId, finalScore);
        toast.success("✅ Next chapter unlocked successfully!");
      } catch (error) {
        toast.error("❌ Error unlocking the chapter. Please try again.");
      }
    } else {
      toast.error(`❌ You scored ${finalScore}%. Minimum 70% required to unlock next chapter.`);
    }
  };

  // Retry the assessment
  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="module-details">
      <h3>{assessment.name || "Chapter Assessment"}</h3>
      <h4>📝 Assessment Questions:</h4>
      <form className="question-list">
        {assessment.questions.map((question, idx) => (
          <div key={question.questionId} className="question">
            <p>{`${idx + 1}. ${question.question}`}</p>
            <div className="options">
              {question.options.map((option, optIdx) => (
                <label key={optIdx} className="option">
                  <input
                    type="radio"
                    name={`question-${question.questionId}`}
                    value={option}
                    onChange={() =>
                      handleAnswerChange(question.questionId, option)
                    }
                    disabled={submitted}
                  />
                  {option}
                </label>
              ))}
            </div>

            {submitted && (
              <p
                className={
                  answers[question.questionId] === question.correctAnswer
                    ? "correct"
                    : "incorrect"
                }
              >
                {answers[question.questionId] === question.correctAnswer
                  ? "✅ Correct!"
                  : "❌ Incorrect"}
              </p>
            )}
          </div>
        ))}

        {!submitted && (
          <button type="button" onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        )}
      </form>

      {submitted && <h4>Your Score: {score}%</h4>}


      {submitted && score < 70 && (
        <button onClick={handleRetry} className="retry-btn">
          Retry
        </button>
      )}
    </div>
  );
};

export default Assessment;
