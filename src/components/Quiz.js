// src/components/Quiz.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState("teaser"); // 'teaser', 'question', 'bonus'

  const currentQuestion = questions[currentIndex];

  // Functions to navigate between questions
  const goNext = () => {
    setDisplayMode("teaser"); // Reset to teaser on next/prev navigation
    setCurrentIndex((currentIndex + 1) % questions.length);
  };

  const goPrevious = () => {
    setDisplayMode("teaser");
    setCurrentIndex((currentIndex - 1 + questions.length) % questions.length);
  };

  // Function to handle the tap cycle
  const handleTap = () => {
    if (displayMode === "teaser") {
      setDisplayMode("question");
    } else if (displayMode === "question") {
      setDisplayMode(currentQuestion.bonus ? "bonus" : "teaser"); // Go to bonus if available
    } else if (displayMode === "bonus") {
      setDisplayMode("teaser"); // Back to teaser
    }
  };

  return (
    <div className="quiz" style={{ backgroundColor: '#F2A39A' }}>
      <header>
        <span className="question-number">
          {displayMode === "bonus" ? "BONUS QUESTION" : "QUESTION"} #{String(currentIndex + 1).padStart(3, '0')}
        </span>
        <Link to="/" className="exit">Exit</Link>
      </header>

      <div className="content" onClick={handleTap}>
        {displayMode === "teaser" && <h2 className="teaser-text">{currentQuestion.teaser}</h2>}
        {displayMode === "question" && (
          <>
            <h2 className="question-text">{currentQuestion.question}</h2>
            <p className="answer-text">{currentQuestion.answer}</p>
          </>
        )}
        {displayMode === "bonus" && currentQuestion.bonus && (
          <>
            <h2 className="bonus-text">{currentQuestion.bonus}</h2>
            <p className="answer-text">{currentQuestion.bonusAnswer}</p>
          </>
        )}
        <p className="toggle-text">
          {displayMode === "teaser" ? "TAP TO REVEAL QUESTION" :
           displayMode === "question" ? (currentQuestion.bonus ? "TAP TO VIEW BONUS QUESTION" : "TAP TO HIDE QUESTION") :
           "TAP TO HIDE QUESTION"}
        </p>
      </div>

      {/* Navigation arrows */}
      <div className="nav-arrows">
        <div onClick={goPrevious} className="nav-arrow left-arrow">&#9664;</div> {/* Left arrow */}
        <div onClick={goNext} className="nav-arrow right-arrow">&#9654;</div>   {/* Right arrow */}
      </div>
    </div>
  );
}

export default Quiz;
