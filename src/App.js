// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setQuestions={setQuestions} />} />
        <Route path="/quiz" element={<Quiz questions={questions} />} />
      </Routes>
    </Router>
  );
}

export default App;
