import React, { useState, useEffect } from 'react';
import './CalculoPage.css';
import ForceDiagram from './ForceDiagram';
import { useNavigate } from 'react-router-dom';

const CalculoPage = () => {
  const navigate = useNavigate();

  const getRandomValue = (min, max) => Math.random() * (max - min) + min;

  const [P, setP] = useState(Math.round(getRandomValue(20, 80)));
  const [mu, setMu] = useState(getRandomValue(0.05, 1).toFixed(2));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [tipCount, setTipCount] = useState(0);
  const [tips, setTips] = useState([]);

  // Calculate the correct answer
  const correctAnswer = P * 10 * mu;

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

  const handleSkip = () => {
    navigate('/dashboard');  // Navigate to /dashboard
  };

  useEffect(() => {
    if (isCorrect) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 5000);

      return () => clearTimeout(timer);  // Cleanup timer if component unmounts or isCorrect changes
    }
  }, [isCorrect, navigate]);

  return (
    <div className="quiz-container">
      <div className="exit-button">
        <button onClick={handleSkip}>Omitir</button>
      </div>
      <h1 className="question-title">Pregunta de calculo numerico</h1>
      <div className="question-content">
        <p className="question-text">
          Dado el siguiente diagrama, donde F es una fuerza aplicada sobre el objeto de masa M, 
          P es el peso del objeto y mu el coeficiente de fricción entre el objeto y el suelo.
        </p>
        {/* Replace the static image with the dynamic diagram */}
        <div className="question-diagram">
          <ForceDiagram F={correctAnswer} P={P} mu={mu} />
        </div>
        <p className="question-more-text">
          Sabiendo que la Masa del objeto es de {P} Kg y mu = {mu} calcule la fuerza necesaria para vencer la fricción estática. (Considere g = 10)
        </p>
      </div>
      <input 
        type="number" 
        className="answer-box" 
        placeholder="Ingresa tu respuesta" 
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <div className="submit-button">
        <button onClick={handleSubmit}>Entregar</button>
      </div>
      {isCorrect !== null && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            'Correcto!     (volveras en 5 segundos)'
          ) : (
            <>
              Incorrecto. Puedes volver a intentar.
              {tipCount < allTips.length && (
                <div className="tip-section">
                  <button onClick={handleGetTip} className="tip-button">Necesitas una pista?</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {tips.length > 0 && (
        <div className="tips-container show">
          {tips.map((tip, index) => (
            <p key={index} className="Pista">{tip}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalculoPage;
