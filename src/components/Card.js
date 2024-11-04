import React, { useState } from 'react';

function Card({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card">
      <h2>{card.teaser}</h2>
      <p>{card.question}</p>
      {showAnswer ? (
        <p><strong>Answer:</strong> {card.answer}</p>
      ) : (
        <button onClick={() => setShowAnswer(true)}>Reveal Answer</button>
      )}
      {showAnswer && (
        <button onClick={() => setShowAnswer(false)}>Hide Answer</button>
      )}
    </div>
  );
}

export default Card;
