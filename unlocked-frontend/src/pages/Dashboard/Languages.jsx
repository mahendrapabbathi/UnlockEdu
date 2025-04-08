import React, { useState, useEffect } from "react";

const Languages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/languages"); // Update the endpoint if necessary
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="languages-container">
      <h2>Available Programming Languages</h2>
      {languages.length > 0 ? (
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>No languages available.</p>
      )}
    </div>
  );
};

export default Languages;
