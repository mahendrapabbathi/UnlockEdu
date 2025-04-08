import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import accordionData from "../../Programming_Languages/programming_languages.js"
import "./CoursePage.css";

const CoursePage = () => {
  const { language } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState({});
  const [unlockedChapters, setUnlockedChapters] = useState([]);

  // const filteredData = accordionData.filter(
  //   (item) => item.language === language
  // );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpenSubIndex({});
  };

  const handleSubToggle = (parentIndex, subIndex) => {
    setOpenSubIndex((prev) => ({
      ...prev,
      [parentIndex]: prev[parentIndex] === subIndex ? null : subIndex,
    }));
  };

  return (
    <div className="language-container">
      <p className="title">{language.toUpperCase()} Programming</p>

      {filteredData.length === 0 ? (
        <p>No content available for {language}</p>
      ) : (
        filteredData.map((item, index) => (
          <div className="accordion" key={index}>
            <button
              className="accordion-header"
              onClick={() => handleToggle(index)}
            >
              <h2>{item.title}</h2>
              <span>
                {openIndex === index ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </span>
            </button>

            {openIndex === index && (
              <div className="accordion-content">
                {item.submodules.map((sub, subIndex) => (
                  <div key={subIndex} className="sub-accordion">
                    <button
                      className="sub-accordion-header"
                      onClick={() => handleSubToggle(index, subIndex)}
                    >
                      <h2>{sub.title}</h2>
                      <span>
                        {openSubIndex[index] === subIndex ? (
                          <i className="fa-solid fa-chevron-up"></i>
                        ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                        )}
                      </span>
                    </button>

                    {openSubIndex[index] === subIndex && (
                      <div className="sub-accordion-content">
                        <p>{sub.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CoursePage;
