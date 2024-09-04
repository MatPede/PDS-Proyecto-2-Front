import React, { useState } from 'react';
import './CalculoPage.css';

const CalculoPage = () => {
  // State for the variables P and mu
  const [P, setP] = useState(450);
  const [mu, setMu] = useState(0.43);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [tipCount, setTipCount] = useState(0);
  const [tips, setTips] = useState([]);

  // Calculate the correct answer
  const correctAnswer = P * mu;

  // Define the margin of error
  const marginOfError = 1;

  // Tips array
  const allTips = [
    "Tip 1: Recuerda que la fuerza de fricción se calcula multiplicando el peso por el coeficiente de fricción.",
    "Tip 2: El peso es la fuerza ejercida por la gravedad sobre el objeto, P = mg, pero aquí ya te han dado el valor de P.",
    "Tip 3: Usa la fórmula F = P * mu para encontrar la fuerza necesaria para vencer la fricción."
  ];

  // Handle answer submission
  const handleSubmit = () => {
    const userAnswerNumber = parseFloat(userAnswer);
    if (userAnswerNumber >= correctAnswer - marginOfError && userAnswerNumber <= correctAnswer + marginOfError) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Handle requesting a tip
  const handleGetTip = () => {
    if (tipCount < allTips.length) {
      setTips((prevTips) => [...prevTips, allTips[tipCount]]);
      setTipCount(tipCount + 1);
    }
  };

  return (
    <div className="quiz-container">
      <div className="exit-button">
        <button>Exit</button>
      </div>
      <h1 className="question-title">Question 1</h1>
      <div className="question-content">
        <p className="question-text">
          Dado el siguiente diagrama, donde F es una fuerza aplicada sobre el objeto de masa M, 
          P es el peso del objeto y mu el coeficiente de friccion entre el objeto y el suelo.
        </p>
        <img src="DiagramExample01.png" alt="Diagram Example" className="question-diagram" />
        <p className="question-more-text">
          Sabiendo que P = {P}N y mu = {mu} calcule la fuerza necesaria para vencer la friccion estatica.
        </p>
      </div>
      <input 
        type="number" 
        className="answer-box" 
        placeholder="Enter your answer" 
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <div className="submit-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {isCorrect !== null && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            'Correct!'
          ) : (
            <>
              Incorrect. The correct answer is approximately {correctAnswer.toFixed(2)}.
              {tipCount < allTips.length && (
                <div className="tip-section">
                  <button onClick={handleGetTip} className="tip-button">Need a Tip?</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <div className="tips-container">
        {tips.map((tip, index) => (
          <p key={index} className="tip">{tip}</p>
        ))}
      </div>
    </div>
  );
};

export default CalculoPage;
