// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Papa from 'papaparse';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  // Automatically load questions from public/csv/questions.csv on mount
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/csv/questions.csv`)
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            setQuestions(results.data);
          }
        });
      })
      .catch(error => console.error("Error loading default CSV:", error));
  }, []);

  // Render Quiz component directly once questions are loaded
  return (
    <Router>
      <Routes>
        {questions.length > 0 ? (
          <Route path="*" element={<Quiz questions={questions} />} />
        ) : (
          <Route path="*" element={<p>Loading questions...</p>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
