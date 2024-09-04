import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";  
import "./AlternativasPage.css";
import MathComponent from '../../components/MathComponent';

const questionsData = [{
    id: 1,
    text: "¿Cuál es la fórmula para calcular la fuerza de fricción estática máxima entre dos superficies?",
    options: [
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot N" />, isCorrect: false, explanation: "Esta fórmula es para la fricción cinética, no estática." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot N" />, isCorrect: true, explanation: "Correcto. La fórmula para la fricción estática máxima es el coeficiente de fricción estática (\u03BC_s) multiplicado por la fuerza normal (N)." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot g" />, isCorrect: false, explanation: "La fuerza de fricción estática se calcula usando la fuerza normal, no la gravedad." },
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot g" />, isCorrect: false, explanation: "Esta fórmula es incorrecta. La fricción cinética se calcula usando el coeficiente de fricción cinética (\u03BC_k), no el de fricción estática." }
    ]
  }, {
    id: 2,
    text: "Si se incrementa la fuerza normal aplicada a un objeto en una superficie horizontal, ¿qué sucede con la fuerza de fricción estática?",
    options: [
      { text: "Disminuye", isCorrect: false, explanation: "La fuerza de fricción estática aumenta con la fuerza normal." },
      { text: "Permanece constante", isCorrect: false, explanation: "La fuerza de fricción estática es proporcional a la fuerza normal, por lo que no permanece constante." },
      { text: "Aumenta", isCorrect: true, explanation: "Correcto. La fuerza de fricción estática aumenta con el incremento de la fuerza normal." },
      { text: "Se vuelve nula", isCorrect: false, explanation: "La fricción estática no se vuelve nula con el incremento de la fuerza normal; en realidad aumenta." }
    ]
  },
  {
    id: 3,
    text: "¿Qué efecto tiene un aumento en el coeficiente de fricción estática sobre la fuerza de fricción entre dos superficies?",
    options: [
      { text: "La fuerza de fricción aumenta", isCorrect: true, explanation: "Correcto. Un mayor coeficiente de fricción estática aumenta la fuerza de fricción estática." },
      { text: "La fuerza de fricción disminuye", isCorrect: false, explanation: "La fuerza de fricción aumenta con un mayor coeficiente de fricción estática." },
      { text: "La fuerza de fricción permanece constante", isCorrect: false, explanation: "La fuerza de fricción no permanece constante; aumenta con un mayor coeficiente de fricción estática." },
      { text: "La fuerza de fricción se vuelve negativa", isCorrect: false, explanation: "La fricción no puede ser negativa; aumenta con un mayor coeficiente de fricción estática." }
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
const AlternativasPage = () => {
    const [allQuestions] = useState(shuffleArray(questionsData));
    const [questions, setQuestions] = useState(selectRandomQuestions(allQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [lastQuestionTime, setLastQuestionTime] = useState(0);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [incorrectFeedback, setIncorrectFeedback] = useState([]);
    const [secondChance, setSecondChance] = useState(false);
    const [showRoundSummary, setShowRoundSummary] = useState(false);

    const navigate = useNavigate();

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOptions([option]);
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            const correctAnswers = currentQuestion.options.filter(option => option.isCorrect);
            const allCorrect = correctAnswers.every(option => selectedOptions.includes(option));
            const anyIncorrect = selectedOptions.some(option => !option.isCorrect);

            const questionEndTime = time - lastQuestionTime;
            setLastQuestionTime(time);

            if (allCorrect && !anyIncorrect) {
                setFeedback("¡Correcto!");
                setScore(prevScore => prevScore + 1);
            } else {
                const incorrectOption = currentQuestion.options.find(option => !option.isCorrect && selectedOptions.includes(option));
                setFeedback("Incorrecto. " + incorrectOption.explanation);
                setIncorrectQuestions(prev => [...prev, currentQuestion]);
                setIncorrectFeedback(prev => [...prev, incorrectOption.explanation]);
            }

            setSelectedOptions([]);
            setFeedback("");

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                if (!secondChance && incorrectQuestions.length > 0) {
                    setShowRoundSummary(true); // Mostrar resumen del primer round
                    setTimeout(() => {
                        setShowRoundSummary(false);
                        setQuestions(incorrectQuestions);
                        setCurrentQuestionIndex(0);
                        setSecondChance(true);
                        setIncorrectQuestions([]);
                    }, 3000); // Esperar 3 segundos antes de avanzar al segundo round
                } else {
                    alert(`¡Quiz completado! Tu puntuación final es: ${score}`);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000);
                }
            }
        } else {
            setFeedback("Por favor selecciona al menos una alternativa.");
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    function generateOptionLabels(numOptions) {
        return Array.from({ length: numOptions }, (_, i) => String.fromCharCode(65 + i) + '.-');
    }

    const optionLabels = generateOptionLabels(currentQuestion.options.length);

    return (
        <div className="alternativas-page">
            <div className="question-container">
                {showRoundSummary ? (
                    <div className="round-summary-container">
                        <h2>Primer Round Completo</h2>
                        <p>Obtuviste {score} correctas de {questions.length} preguntas.</p>
                        <p>Último tiempo de respuesta: {formatTime(lastQuestionTime)}</p>
                    </div>
                ) : (
                    <>
                        <h2>{`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
                        <div className="timer">{formatTime(time)}</div>
                        <div className="question-text">{currentQuestion.text}</div>
                        <ul className="answer-options">
                            {currentQuestion.options.map((option, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleOptionClick(option)}
                                        className={`option-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
                                        disabled={false}
                                    >
                                        {optionLabels[index]} {option.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {feedback && <div className="feedback">{feedback}</div>}
                        {secondChance && incorrectFeedback[currentQuestionIndex] && (
                            <div className="incorrect-feedback">
                                <strong>Retroalimentación: </strong> {incorrectFeedback[currentQuestionIndex]}
                            </div>
                        )}
                        <div className="buttons">
                            <button onClick={handleSkip} className="skip-button">Omitir</button>
                            <button
                                onClick={handleNext}
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

const selectRandomQuestions = (questions) => {
    const numQuestions = Math.floor(Math.random() * 3) + 3;
    return questions.slice(0, numQuestions);
};

export default AlternativasPage;