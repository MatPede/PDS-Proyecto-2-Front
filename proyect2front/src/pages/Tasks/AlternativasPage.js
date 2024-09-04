import React from "react";
import "./AlternativasPage.css";
import { Link } from 'react-router-dom';

const AlternativasPage = () => {
  return (
    <div className="question-container">
      <h2>Question 1</h2>
      <div className="question-text">Text for the question</div>
      <div className="diagram">
        <img src="diagram.png" alt="Diagram" />
      </div>
      <div className="additional-text">More text</div>
      <div className="answer-box">
        <input type="text" placeholder="Type your answer here" />
      </div>
      <div className="buttons">
        <button className="exit-button">Exit</button>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default AlternativasPage;
