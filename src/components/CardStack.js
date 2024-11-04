import React, { useState } from 'react';
import Card from './Card';

function CardStack({ cards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => setCurrentCardIndex((index) => (index + 1) % cards.length);
  const previousCard = () => setCurrentCardIndex((index) => (index > 0 ? index - 1 : cards.length - 1));

  return (
    <div>
      <Card card={cards[currentCardIndex]} />
      <button onClick={previousCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default CardStack;
