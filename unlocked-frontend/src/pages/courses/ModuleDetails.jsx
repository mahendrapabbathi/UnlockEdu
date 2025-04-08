import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./ModuleDetails.css";

const ModuleDetails = ({ module, courseId, chapterId, unlockNextModule }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [nextModuleUnlocked, setNextModuleUnlocked] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null); // Track copied code block

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const validateAnswers = () => {
    return module.questions.every((question) => answers[question.questionId]);
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }

    setError("");
    setSubmitted(true);

    try {
      await unlockNextModule(courseId, chapterId, module.moduleId);
      setNextModuleUnlocked(true);
    } catch (error) {
      console.error("Error unlocking next module:", error);
    }
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 sec
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={`module-details ${module.unlocked ? "" : "locked"}`}>
      <h3>{module.title || "Module Title"}</h3>

      <div className="markdown-content">
        {/* ✅ Render content with Markdown + Copyable Code Blocks */}
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              if (!inline && match) {
                return (
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "1rem",
                    }}
                  >
                    <button
                      onClick={() => handleCopyCode(codeString)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "#4a5568",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        zIndex: -1,
                      }}
                    >
                      {copiedCode === codeString ? "✅ Copied!" : "📋 Copy"}
                    </button>
                    <SyntaxHighlighter
                      style={materialLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {module.content || "Module content goes here."}
        </ReactMarkdown>
      </div>
      <h4>📝 Assessments:</h4>
      {module.questions?.length > 0 ? (
        <form className="question-list" onSubmit={(e) => e.preventDefault()}>
          {module.questions.map((question, idx) => (
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
                      checked={answers[question.questionId] === option}
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

          {error && <p className="error">{error}</p>}

          {!submitted && (
            <button type="button" onClick={handleSubmit} className="submit-btn">
              Submit Answers
            </button>
          )}
        </form>
      ) : (
        <p>No questions available for this module.</p>
      )}

      {submitted && nextModuleUnlocked && (
        <div className="success-banner">
          🎉 Great job! The next module is now unlocked. Review your answers
          here and continue whenever you’re ready.
        </div>
      )}
    </div>
  );
};

export default ModuleDetails;
