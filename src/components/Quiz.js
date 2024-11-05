// src/components/Quiz.js
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState("teaser");
  const [showAnswer, setShowAnswer] = useState(false);
  const [fadeClass, setFadeClass] = useState(""); // New state for fade effect

  const currentQuestion = questions[currentIndex];

  // Define category colors
  const categoryColors = {
    "History": "#FFDD94",
    "Science": "#C8E6C9",
    "Geography": "#A5D8FF",
    "Pop Culture": "#F4B6C2",
    "Art & Literature": "#D7BDE2",
    "Sports & Games": "#FFD700",
    "Mythology & Religion": "#F8C471",
    "Music": "#FFC1A1",
    "Movies & TV": "#9FE2BF",
    "Technology": "#AED6F1",
    "Food & Drink": "#FFB6C1",
    "Nature & Environment": "#90EE90"
  };

  const backgroundColor = categoryColors[currentQuestion.category] || "#F2A39A";

  // Add fade effect on question change
  const switchQuestion = (newIndex) => {
    setFadeClass("fade-out"); // Apply fade-out class
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeClass("fade-in"); // Apply fade-in class
      setShowAnswer(false); // Hide answer for the new question
    }, 300); // Transition duration (matches CSS)
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % questions.length;
    switchQuestion(nextIndex);
  };

  const goPrevious = () => {
    const prevIndex = (currentIndex - 1 + questions.length) % questions.length;
    switchQuestion(prevIndex);
  };

  const toggleQuestionView = () => {
    setDisplayMode(displayMode === "teaser" ? "question" : "teaser");
    setShowAnswer(false);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrevious,
    trackMouse: true
  });

  return (
    <div className="quiz" style={{ backgroundColor }} {...swipeHandlers}>
      <header className="header">
        <span className="question-info">
          {currentQuestion.category} - QUESTION #{currentQuestion.id}
        </span>
      </header>

      {/* Apply fade class to content container */}
      <div className={`content ${fadeClass}`}>
        {displayMode === "teaser" && <h2 className="teaser-text">{currentQuestion.teaser}</h2>}
        
        {displayMode === "question" && (
          <>
            <h2 className="question-text">{currentQuestion.question}</h2>
            
            <div className="answer-container">
              <button 
                className="toggle-answer-btn" 
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>

              <p className={`answer-text ${showAnswer ? "visible" : ""}`}>
                {currentQuestion.answer}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="bottom-controls">
        <button 
          className="toggle-question-btn" 
          onClick={toggleQuestionView}
        >
          {displayMode === "teaser" ? "Show Question" : "Hide Question"}
        </button>

        <div className="nav-arrows">
          <div onClick={goPrevious} className="nav-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div onClick={goNext} className="nav-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
