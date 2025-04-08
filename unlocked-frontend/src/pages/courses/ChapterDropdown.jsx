
import React, { useState, useRef, useEffect } from "react";
import ModuleDetails from "./ModuleDetails";
import Assessment from "./Assessment";
import "./ChapterDropdown.css";

const ChapterDropdown = ({
  chapter,
  courseId,
  unlockNextChapter,
  unlockNextModule,
  isActive,
  setActiveChapterIndex,
  index,
}) => {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const moduleRefs = useRef([]);
  const assessmentRef = useRef(null);
  const chapterRef = useRef(null);

  const toggleDropdown = () => {
    if (!chapter.unlocked) return;

    if (isActive) {
      setActiveChapterIndex(null);
    } else {
      setActiveChapterIndex(index);
    }

    setSelectedModuleIndex(null);
    setIsAssessmentOpen(false);
  };

  const handleModuleClick = (idx) => {
    if (!chapter.unlocked || !chapter.modules[idx]?.unlocked) return;

    const newIndex = idx === selectedModuleIndex ? null : idx;
    setSelectedModuleIndex(newIndex);

    if (newIndex !== null) {
      setTimeout(() => {
        const element = moduleRefs.current[newIndex]?.current;
        if (element) {
          const yOffset = -400;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  };

  const toggleAssessment = () => {
    if (!chapter.unlocked) return;

    const newState = !isAssessmentOpen;
    setIsAssessmentOpen(newState);

    if (newState) {
      setTimeout(() => {
        const element = assessmentRef.current;
        if (element) {
          const yOffset = -200;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (isActive && chapterRef.current) {
      setTimeout(() => {
        const yOffset = -100;
        const y = chapterRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
    }
  }, [isActive]);

  return (
    <div className={`chapter-container ${chapter.unlocked ? "unlocked" : "locked"}`} ref={chapterRef}>
      <div className="chapter-header" onClick={toggleDropdown}>
        <h4 style={{ color: isActive ? "violet" : "white" }}>
          {chapter.title || chapter.name}
        </h4>
        <span>{isActive ? "▲" : "▼"}</span>
      </div>

      {isActive && (
        <div className="chapter-content">
          {chapter.modules?.length > 0 ? (
            chapter.modules.map((module, idx) => {
              if (!moduleRefs.current[idx]) {
                moduleRefs.current[idx] = React.createRef();
              }

              return (
                <div
                  key={idx}
                  className={`module-item ${module.unlocked ? "unlocked" : "locked"}`}
                >
                  <div
                    className={`module-header ${module.unlocked ? "" : "disabled"}`}
                    onClick={() => handleModuleClick(idx)}
                  >
                    <span style={{ color: selectedModuleIndex === idx ? "violet" : "white" }}>
                      📚 {module.name || module.title}
                    </span>
                    <span>{selectedModuleIndex === idx ? "▲" : "▼"}</span>
                  </div>

                  {selectedModuleIndex === idx && (
                    <div className="module-details-dropdown" ref={moduleRefs.current[idx]}>
                      <ModuleDetails
                        module={module}
                        unlockNextModule={unlockNextModule}
                        chapterId={chapter.chapterId}
                        courseId={courseId}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No modules available for this chapter.</p>
          )}

          <div className="assessment-section">
            <div
              className={`assessment-header ${chapter.unlocked ? "" : "disabled"}`}
              onClick={toggleAssessment}
            >
              <span style={{ color: isAssessmentOpen ? "violet" : "white" }}>
                🎯 Chapter Assessment
              </span>
              <span>{isAssessmentOpen ? "▲" : "▼"}</span>
            </div>

            {isAssessmentOpen && (
              <div className="assessment-details" ref={assessmentRef}>
                <Assessment
                  assessment={chapter.assessment}
                  unlockNextChapter={unlockNextChapter}
                  courseId={courseId}
                  chapterId={chapter.chapterId}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDropdown;
