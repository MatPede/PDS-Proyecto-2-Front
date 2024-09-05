import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";  
import "./AlternativasPage.css";
import MathComponent from '../../components/MathComponent';

const questionsData = [{
    id: 1,
    text: "¿Cuál es la fórmula para calcular la fuerza de fricción estática máxima entre dos superficies?",
    options: [
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot N" />, isCorrect: false, explanation: "Esta fórmula es para la fricción cinética, no estática." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot N" />, isCorrect: true, explanation: "Correcto. La fórmula para la fricción estática máxima es el coeficiente de fricción estática multiplicado por la fuerza normal (N)." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot g" />, isCorrect: false, explanation: "La fuerza de fricción estática se calcula usando la fuerza normal, no la gravedad." },
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot g" />, isCorrect: false, explanation: "La fricción cinética se calcula usando el coeficiente de fricción cinética, no el de fricción estática." }
    ]
  }, {
    id: 2,
    text: "Si se incrementa la fuerza normal aplicada a un objeto en una superficie horizontal, ¿qué sucede con la fuerza de fricción estática?",
    options: [
      { text: "Disminuye", isCorrect: false, explanation: "La fuerza de fricción estática aumenta con la fuerza normal." },
      { text: "Permanece constante", isCorrect: false, explanation: "La fuerza de fricción estática es proporcional a la fuerza normal, por lo que no permanece constante." },
      { text: "Aumenta", isCorrect: true, explanation: "Correcto. La fuerza de fricción estática aumenta con el incremento de la fuerza normal." },
      { text: "Se vuelve nula", isCorrect: false, explanation: "La fricción estática no se vuelve nula con el incremento de la fuerza normal." }
    ]
  },
  {
    id: 3,
    text: "¿Qué efecto tiene un aumento en el coeficiente de fricción estática sobre la fuerza de fricción entre dos superficies?",
    options: [
      { text: "La fuerza de fricción aumenta", isCorrect: true, explanation: "Correcto. Un mayor coeficiente de fricción estática aumenta la fuerza de fricción estática." },
      { text: "La fuerza de fricción disminuye", isCorrect: false, explanation: "La fuerza de fricción aumenta con un mayor coeficiente de fricción estática." },
      { text: "La fuerza de fricción permanece constante", isCorrect: false, explanation: "La fuerza de fricción no permanece constante." },
      { text: "La fuerza de fricción se vuelve negativa", isCorrect: false, explanation: "La fricción no puede ser negativa." }
    ]
  },
  {
    id: 4,
    text: "¿Cuál es la diferencia principal entre fricción estática y fricción cinética?",
    options: [
      { text: "La fricción cinética es generalmente mayor que la fricción estática", isCorrect: false, explanation: "En general, la fricción cinética es menor que la fricción estática." },
      { text: "La fricción estática actúa cuando las superficies están en movimiento relativo", isCorrect: false, explanation: "La fricción estática actúa cuando las superficies están en reposo relativo." },
      { text: "La fricción cinética actúa cuando las superficies están en reposo", isCorrect: false, explanation: "La fricción cinética actúa cuando las superficies están en movimiento relativo." },
      { text: "La fricción estática actúa cuando las superficies están en reposo", isCorrect: true, explanation: "Correcto. La fricción estática actúa cuando las superficies están en reposo relativo, mientras que la fricción cinética actúa durante el movimiento relativo." }
    ]
  },
  {
    id: 5,
    text: "Un objeto en reposo sobre una superficie inclinada comienza a deslizarse cuando el ángulo de inclinación alcanza un cierto valor crítico. ¿Cómo se relaciona este ángulo crítico con el coeficiente de fricción estática?",
    options: [
      { text: "El ángulo crítico es menor cuando el coeficiente de fricción estática es mayor", isCorrect: false, explanation: "Un mayor coeficiente de fricción estática permite que el objeto mantenga su posición en un ángulo de inclinación mayor." },
      { text: "El ángulo crítico es mayor cuando el coeficiente de fricción estática es mayor", isCorrect: true, explanation: "Correcto. Un mayor coeficiente de fricción estática permite un ángulo crítico mayor antes de que el objeto comience a deslizarse." },
      { text: "El ángulo crítico no depende del coeficiente de fricción estática", isCorrect: false, explanation: "El ángulo crítico depende directamente del coeficiente de fricción estática." },
      { text: "El ángulo crítico y el coeficiente de fricción estática son independientes entre sí", isCorrect: false, explanation: "El ángulo crítico y el coeficiente de fricción estática están directamente relacionados." }
    ]
  }
];

const selectRandomQuestions = (questions) => {
    const numQuestions = Math.floor(Math.random() * 3) + 3;
    return questions.slice(0, numQuestions);
};

const AlternativasPage = () => {
    const [allQuestions] = useState(shuffleArray(questionsData));
    const [questions, setQuestions] = useState(selectRandomQuestions(allQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [incorrectQuestionsFirstRound, setIncorrectQuestionsFirstRound] = useState([]);
    const [secondChance, setSecondChance] = useState(false);
    const [showRoundSummary, setShowRoundSummary] = useState(false);
    const [finalTime, setFinalTime] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [waitTime, setWaitTime] = useState(5); // Tiempo de espera en segundos

    const navigate = useNavigate();
    const currentQuestions = secondChance ? incorrectQuestionsFirstRound.map(q => q.question) : questions;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const currentIncorrectOption = secondChance ? incorrectQuestionsFirstRound[currentQuestionIndex]?.selectedOption : null;
    const currentFeedback = secondChance ? incorrectQuestionsFirstRound[currentQuestionIndex]?.question.options.find(option => option === currentIncorrectOption)?.explanation : '';

    // Temporizador para el tiempo transcurrido
    useEffect(() => {
        const timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Temporizador para el tiempo de espera
    useEffect(() => {
        if (showRoundSummary && waitTime > 0) {
            const waitTimer = setInterval(() => setWaitTime(prevWaitTime => prevWaitTime - 1), 1000);
            return () => clearInterval(waitTimer);
        } else if (showRoundSummary && waitTime === 0) {
            setShowRoundSummary(false);
            setQuestions(incorrectQuestionsFirstRound.map(q => q.question)); // Actualiza las preguntas para el segundo round
            setCurrentQuestionIndex(0);
            setSecondChance(true);
        }
    }, [showRoundSummary, waitTime]);

    // Manejo de clic en opciones
    const handleOptionClick = (option) => setSelectedOptions([option]);

    const handleNext = () => {
        if (selectedOptions.length === 0) {
            setFeedback("Por favor selecciona al menos una alternativa.");
            return;
        }

        const correctAnswers = currentQuestion.options.filter(option => option.isCorrect);
        const allCorrect = correctAnswers.every(option => selectedOptions.includes(option));
        const anyIncorrect = selectedOptions.some(option => !option.isCorrect);
        const incorrectOption = currentQuestion.options.find(option => !option.isCorrect && selectedOptions.includes(option));

        setFeedback(allCorrect && !anyIncorrect ? "¡Correcto!" : `Incorrecto. ${incorrectOption?.explanation || ''}`);
        setScore(prevScore => allCorrect && !anyIncorrect ? prevScore + 1 : prevScore);

        if (!secondChance && !allCorrect) {
            setIncorrectQuestionsFirstRound(prev => [
                ...prev,
                {
                    question: currentQuestion,
                    selectedOption: incorrectOption
                }
            ]);
        }

        setSelectedOptions([]);
        setFeedback("");

        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFinalTime(time); // Guardar el tiempo final

            if (!secondChance && incorrectQuestionsFirstRound.length > 0) {
                setShowRoundSummary(true);
                setWaitTime(5); // Reiniciar el tiempo de espera
            } else {
                setQuizCompleted(true);
            }
        }
    };

    // Manejo del botón "Omitir"
    const handleSkip = () => navigate('/dashboard');

    // Formateo del tiempo
    const formatTime = (time) => `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;

    // Generar etiquetas para opciones
    const generateOptionLabels = (numOptions) => Array.from({ length: numOptions }, (_, i) => String.fromCharCode(65 + i) + '.-');

    const optionLabels = generateOptionLabels(currentQuestion.options.length);

    return (
        <div className="alternativas-page">
          <div className="question-container">
            {showRoundSummary ? (
              <div className="round-summary-container">
                <h2>Primer Round Completo</h2>
                <p>Obtuviste {score} correctas de {questions.length} preguntas.</p>
                <p>Tiempo de respuesta: {formatTime(finalTime)}</p>
                <p>Pasando al siguiente round en {waitTime} segundos...</p>
              </div>
            ) : quizCompleted ? (
              <div className="quiz-summary-wrapper">
                           <h2>Quiz Completado</h2>
                  <p>Tiempo total: {formatTime(finalTime)}</p>
                  <p>Correctas: {questions.length - incorrectQuestionsFirstRound.length} / Incorrectas: {incorrectQuestionsFirstRound.length}</p>
                <div className="quiz-summary-container">
       
      
                {incorrectQuestionsFirstRound.length > 0 && (
  <div className="incorrect-questions-summary">
    <h3>Alternativas correctas del segundo round:</h3>
    {incorrectQuestionsFirstRound.map((item, index) => (
      <div key={index} className="incorrect-question">
        <p>{item.question.text}</p>
        <ul className="answer-options">
          {item.question.options
            .filter(option => option.isCorrect) // Filtrar solo opciones correctas
            .map((option, idx) => (
              <li key={idx}>
                <button
                  className="option-button correct-option"
                  disabled
                >
                  {optionLabels[idx]} {option.text}
                </button>
              </li>
            ))}
        </ul>
      </div>
    ))}
  </div>
)}

                </div>
      
                {/* Contenedor separado para el botón */}
                <div className="navigation-buttons-container">
                  <button onClick={() => navigate('/dashboard')} className="finish-button">Volver al inicio</button>
                </div>
              </div>
            ) : (
              <>
                <h2>{`Pregunta ${currentQuestionIndex + 1} de ${currentQuestions.length}`}</h2>
                <div className="timer">{formatTime(time)}</div>
                <div className="question-text">{currentQuestion.text}</div>
                <ul className="answer-options">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOptions.includes(option);
                    const isIncorrect = secondChance && currentIncorrectOption === option;
                    return (
                      <li key={index}>
                        <button
                          onClick={() => handleOptionClick(option)}
                          className={`option-button ${isSelected ? 'selected' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                          disabled={secondChance && isIncorrect}
                        >
                          {optionLabels[index]} {option.text}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {feedback && <div className="feedback">{feedback}</div>}
                {secondChance && currentFeedback && (
                  <div className="incorrect-feedback">
                    <strong>Retroalimentación: </strong> {currentFeedback}
                  </div>
                )}
                <div className="buttons">
                  <button onClick={handleSkip} className="skip-button">Omitir</button>
                  <button 
                    onClick={handleNext} 
                    className={`next-button ${selectedOptions.length !== 1 ? 'disabled' : ''}`}
                    disabled={selectedOptions.length !== 1}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      );
      
};

const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

export default AlternativasPage;