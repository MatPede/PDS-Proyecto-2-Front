import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";  
import "./AlternativasPage.css";
import MathComponent from '../../components/MathComponent';

const questionsData = [{
    id: 1,
    text: "¿Cuál es la fórmula para calcular la fuerza de fricción estática máxima entre dos superficies?",
    options: [
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot N" />, isCorrect: false, explanation: "Esta fórmula corresponde a la fricción cinética, no a la fricción estática. La fricción cinética se calcula de manera diferente a la estática." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot N" />, isCorrect: true, explanation: "Esta es la fórmula correcta para la fricción estática máxima. No es necesaria la explicación de por qué es correcta en este caso." },
      { text: <MathComponent formula="F_{fr} = \mu_s \cdot g" />, isCorrect: false, explanation: "La fórmula de la fricción estática no se basa en la gravedad. La fricción estática se calcula usando la fuerza normal, no la gravedad." },
      { text: <MathComponent formula="F_{fr} = \mu_k \cdot g" />, isCorrect: false, explanation: "Esta fórmula es para la fricción cinética y utiliza el coeficiente de fricción cinética. No corresponde a la fricción estática, que se calcula de otra manera." }
    ]
  }, {
    id: 2,
    text: "Si se incrementa la fuerza normal aplicada a un objeto en una superficie horizontal, ¿qué sucede con la fuerza de fricción estática?",
    options: [
      { text: "Disminuye", isCorrect: false, explanation: "La fuerza de fricción estática no disminuye con el aumento de la fuerza normal; de hecho, debería aumentar." },
      { text: "Permanece constante", isCorrect: false, explanation: "La fuerza de fricción estática no permanece constante con la fuerza normal; está directamente relacionada con ella y cambiará con el incremento de la fuerza normal." },
      { text: "Aumenta", isCorrect: true, explanation: "Esta es la respuesta correcta. La fuerza de fricción estática aumenta con la fuerza normal. No se requiere más explicación para esta opción." },
      { text: "Se vuelve nula", isCorrect: false, explanation: "La fricción estática no se vuelve nula con el aumento de la fuerza normal. En realidad, su valor aumenta." }
    ]
  },
  {
    id: 3,
    text: "¿Qué efecto tiene un aumento en el coeficiente de fricción estática sobre la fuerza de fricción entre dos superficies?",
    options: [
      { text: "La fuerza de fricción aumenta", isCorrect: true, explanation: "Esta opción es correcta. Un aumento en el coeficiente de fricción estática incrementa la fuerza de fricción. No es necesario justificar esta opción más allá de que es la respuesta correcta." },
      { text: "La fuerza de fricción disminuye", isCorrect: false, explanation: "Un aumento en el coeficiente de fricción estática no provoca una disminución en la fuerza de fricción; de hecho, la fuerza de fricción aumentará." },
      { text: "La fuerza de fricción permanece constante", isCorrect: false, explanation: "El coeficiente de fricción estática afecta directamente la fuerza de fricción, por lo que no permanece constante." },
      { text: "La fuerza de fricción se vuelve negativa", isCorrect: false, explanation: "La fricción no puede ser negativa; un mayor coeficiente de fricción estática en realidad aumenta la fuerza de fricción." }
    ]
  },
  {
    id: 4,
    text: "¿Cuál es la diferencia principal entre fricción estática y fricción cinética?",
    options: [
      { text: "La fricción cinética es generalmente mayor que la fricción estática", isCorrect: false, explanation: "Generalmente, la fricción cinética es menor que la fricción estática. Por lo tanto, esta opción no refleja la relación correcta entre las dos." },
      { text: "La fricción estática actúa cuando las superficies están en movimiento relativo", isCorrect: false, explanation: "La fricción estática actúa cuando las superficies están en reposo relativo, no cuando están en movimiento." },
      { text: "La fricción cinética actúa cuando las superficies están en reposo", isCorrect: false, explanation: "La fricción cinética actúa cuando las superficies están en movimiento relativo, no cuando están en reposo." },
      { text: "La fricción estática actúa cuando las superficies están en reposo", isCorrect: true, explanation: "Esta opción es correcta. La fricción estática actúa cuando las superficies están en reposo relativo, mientras que la cinética actúa durante el movimiento relativo." }
    ]
  },
  {
    id: 5,
    text: "Un objeto en reposo sobre una superficie inclinada comienza a deslizarse cuando el ángulo de inclinación alcanza un cierto valor crítico. ¿Cómo se relaciona este ángulo crítico con el coeficiente de fricción estática?",
    options: [
      { text: "El ángulo crítico es menor cuando el coeficiente de fricción estática es mayor", isCorrect: false, explanation: "Un mayor coeficiente de fricción estática permite al objeto resistir un ángulo de inclinación mayor, no menor." },
      { text: "El ángulo crítico es mayor cuando el coeficiente de fricción estática es mayor", isCorrect: true, explanation: "Esta es la opción correcta. Un mayor coeficiente de fricción estática permite un ángulo crítico mayor antes de que el objeto comience a deslizarse." },
      { text: "El ángulo crítico no depende del coeficiente de fricción estática", isCorrect: false, explanation: "El ángulo crítico está directamente relacionado con el coeficiente de fricción estática, por lo que esta opción no es correcta." },
      { text: "El ángulo crítico y el coeficiente de fricción estática son independientes entre sí", isCorrect: false, explanation: "El ángulo crítico y el coeficiente de fricción estática están directamente relacionados; un cambio en uno afecta al otro." }
    ]
  }
];


// Función para barajar un array
const shuffleArray = (array) => {
    let currentIndex = array.length;
    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// Función para seleccionar preguntas aleatorias
const selectRandomQuestions = (questions) => {
    const numQuestions = Math.floor(Math.random() * 3) + 3;
    return questions.slice(0, numQuestions);
};

// Componente principal
const AlternativasPage = () => {
    const [allQuestions] = useState(shuffleArray(questionsData));
    const [questions, setQuestions] = useState(selectRandomQuestions(allQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [lastQuestionTime, setLastQuestionTime] = useState(0);
    const [incorrectQuestionsFirstRound, setIncorrectQuestionsFirstRound] = useState([]);
    const [incorrectFeedback, setIncorrectFeedback] = useState([]);
    const [secondChance, setSecondChance] = useState(false);
    const [showRoundSummary, setShowRoundSummary] = useState(false);

    const navigate = useNavigate();
    const currentQuestion = questions[currentQuestionIndex];

    // Temporizador para el tiempo transcurrido
    useEffect(() => {
        const timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Manejo de clic en opciones
    const handleOptionClick = (option) => setSelectedOptions([option]);

    // Manejo del botón "Siguiente"
    // Manejo del botón "Siguiente"
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
    setIncorrectQuestionsFirstRound(prev => !secondChance && !allCorrect ? [...prev, { question: currentQuestion, selectedOption: incorrectOption }] : prev);
    setIncorrectFeedback(prev => !secondChance && !allCorrect ? [...prev, incorrectOption?.explanation || ''] : prev);

    setSelectedOptions([]);
    setFeedback("");

    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        if (!secondChance && incorrectQuestionsFirstRound.length > 0) {
            setShowRoundSummary(true);
            setTimeout(() => {
                setShowRoundSummary(false);
                setQuestions(incorrectQuestionsFirstRound.map(q => q.question));
                setCurrentQuestionIndex(0);
                setSecondChance(true);
            }, 3000);
        } else {
            alert(`¡Quiz completado! Tu puntuación final es: ${score}`);
            setTimeout(() => navigate('/dashboard'), 1000);
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
        <p>Tiempo de respuesta: {formatTime(time)}</p>
    </div>
) : (
    <>
        <h2>{`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}</h2>
        <div className="timer">{formatTime(time)}</div>
        <div className="question-text">{currentQuestion.text}</div>
        <ul className="answer-options">
            {currentQuestion.options.map((option, index) => {
                const isDisabled = secondChance && incorrectQuestionsFirstRound.some(q => q.selectedOption === option);
                return (
                    <li key={index}>
                        <button
                            onClick={() => handleOptionClick(option)}
                            className={`option-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            disabled={isDisabled}
                        >
                            {optionLabels[index]} {option.text}
                        </button>
                    </li>
                );
            })}
        </ul>
        {feedback && <div className="feedback">{feedback}</div>}
        {secondChance && incorrectFeedback[currentQuestionIndex] && (
            <div className="incorrect-feedback">
                <strong>Retroalimentación: </strong> {incorrectFeedback[currentQuestionIndex]}
            </div>
        )}
        <div className="buttons">
            <button onClick={handleSkip} className="skip-button">Omitir</button>
            <button onClick={handleNext} disabled={selectedOptions.length !== 1}>Siguiente</button>
        </div>
    </>
)}

            </div>
        </div>
    );
};

export default AlternativasPage;