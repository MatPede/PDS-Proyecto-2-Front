import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./AlternativasPage.css";

import MathComponent from '../../components/MathComponent';
//cantidad de preguntas que vas a contestar, el tiempo total del test desde que lo empece, tiempo total desde que ingresaste a la materia


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
  const [questions] = useState(shuffleArray(questionsData).slice(0, 5)); // Selecciona 3 a 5 preguntas aleatorias
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();  

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    setUserAnswer(option);
  };

  const handleSubmit = () => {
    if (userAnswer) {
      if (userAnswer.isCorrect) {
        setScore(score + 1);
        setFeedback("Correcto!");
      } else {
        setScore(score - 1);
        setFeedback(userAnswer.explanation);
      }
    } else {
      setFeedback("Por favor selecciona una alternativa.");
    }
  };

  const handleNext = () => {
    setFeedback("");
    setUserAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // mostrar el puntaje final
      alert(`¡Quiz completado! Tu puntuación final es: ${score}`);
      // 3 segundos antes de redirigir
      setTimeout(() => {
        navigate('/dashboard'); // Redirigir a Dashboard
      }, 1000);
    }
  };
  
  const handleSkip = () => {
    navigate('/dashboard');  
  };

  return (
    <div className="question-container">
      <h2>{`Pregunta ${currentQuestionIndex + 1}`}</h2>
      <div className="question-text">{currentQuestion.text}</div>
      {/* <div className="diagram">
        <img src="diagram.png" alt="Diagram" />
      </div> */}
      <ul className="answer-options">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerClick(option)}
              className={userAnswer === option ? "selected" : ""}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
      <div className="feedback">{feedback}</div>
      <div className="buttons">
        <button className="submit-button" onClick={handleSubmit}>
          Aceptar
        </button>
        <button className="next-button" onClick={handleNext} disabled={!feedback}>
          Siguiente
        </button>
        <button className="skip-button" onClick={handleSkip}>
          Saltar tarea
        </button>
      </div>
    </div>
  );
};

// Función para mezclar el array de preguntas
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default AlternativasPage;
