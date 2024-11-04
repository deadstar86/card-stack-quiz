// src/components/Quiz.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  // Ensure there are questions loaded before trying to render
  if (questions.length === 0) {
    return <p>No questions loaded. Please go back to the home screen and upload a CSV.</p>;
  }

  const currentQuestion = questions[currentIndex];
  
  const goNext = () => {
    setShowQuestion(false); // Hide the question when moving to the next one
    setCurrentIndex((currentIndex + 1) % questions.length);
  };

  const goPrevious = () => {
    setShowQuestion(false); // Hide the question when moving to the previous one
    setCurrentIndex((currentIndex - 1 + questions.length) % questions.length);
  };

  const toggleQuestion = () => setShowQuestion(!showQuestion);

  return (
    <div className="quiz" style={{ backgroundColor: '#F2A39A' }}> {/* Replace with dynamic color later */}
      <header>
        <span>#{String(currentIndex + 1).padStart(3, '0')}</span>
        <Link to="/" className="exit">Exit</Link>
      </header>

      <div className="content" onClick={toggleQuestion}>
        <h2>{showQuestion ? currentQuestion.question : currentQuestion.teaser}</h2>
        <p className="toggle-text">
          {showQuestion ? "TAP TO HIDE QUESTION" : "TAP TO REVEAL QUESTION"}
        </p>
      </div>

      <div className="nav-buttons">
        <button onClick={goPrevious} className="nav-button">Previous Question</button>
        <button onClick={goNext} className="nav-button">Next Question</button>
      </div>
    </div>
  );
}

export default Quiz;
