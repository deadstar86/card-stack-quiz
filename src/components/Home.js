// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

function Home({ setQuestions }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setQuestions(results.data);
      }
    });
  };

  return (
    <div className="home">
      <h1>Welcome to the Quiz</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Link to="/quiz">
        <button className="start-button">Start Quiz</button>
      </Link>
    </div>
  );
}

export default Home;
