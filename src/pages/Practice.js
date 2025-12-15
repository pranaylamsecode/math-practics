import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import './Practice.css';

const Practice = () => {
  const { mode } = useParams(); // 'root' or 'cube' or 'tables'
  const location = useLocation(); // Hook to get query params
  const { updateProgress } = useProgress();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      min: parseInt(params.get('min')) || 1,
      max: parseInt(params.get('max')) || 10
    };
  };

  const generateQuestion = () => {
    if (mode === 'tables') {
      const { min, max } = getQueryParams();
      // Ensure min <= max
      const safeMin = Math.min(min, max);
      const safeMax = Math.max(min, max);

      const base = Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
      const multiplier = Math.floor(Math.random() * 20) + 1; // 1 to 20

      return {
        base: base * multiplier, // For tables, the 'base' is the answer
        multiplier,
        value: base * multiplier,
        display: `${base} × ${multiplier}`
      };
    }

    let base;
    if (mode === 'cube') {
      base = Math.floor(Math.random() * 30) + 1; // 1 to 30 for cubes
    } else {
      base = Math.floor(Math.random() * 100) + 1; // 1 to 100 for roots
    }

    const value = mode === 'cube' ? Math.pow(base, 3) : Math.pow(base, 2);
    return { base, value, display: value }; // Unified structure
  };

  const nextQuestion = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFeedback(null);
    setAnswer('');
    setLastCorrectAnswer(null);
    setQuestion(generateQuestion());
    // Small timeout to ensure render cycle completes before focus if needed, 
    // though usually immediate focus works
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 10);
  };

  useEffect(() => {
    // Reset state when mode changes
    nextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If feedback is already showing, this button acts as "Next"
    if (feedback) {
      nextQuestion();
      return;
    }

    if (!answer) return;

    const userVal = parseInt(answer, 10);
    // For roots/cubes: question is value, answer is base.
    // For tables: question is value (product), answer is also value (product)?
    // Wait, generateQuestion logic:
    // Roots: value = 25, base = 5. User enters 5. (Correct: userVal === base)
    // Tables: value = 20 (from 4*5), base = 4. User enters 20. (Correct: userVal === value)

    let isCorrect;
    if (mode === 'tables') {
      isCorrect = userVal === question.value;
    } else {
      isCorrect = userVal === question.base;
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    // Show correct answer accordingly
    if (!isCorrect) {
      setLastCorrectAnswer(mode === 'tables' ? question.value : question.base);
    }

    updateProgress(mode, isCorrect);

    // Auto generate new question after delay, but save timer ref so we can cancel it
    timerRef.current = setTimeout(() => {
      nextQuestion();
    }, isCorrect ? 1500 : 3000); // 1.5s for correct, 3s for incorrect
  };

  if (!question) return <div>Loading...</div>;

  const isRoot = mode === 'root' || mode === 'root-one';

  return (
    <div className="practice-container">
      <div className="practice-header">
        <Link to="/" className="back-link">← Back</Link>
        <h2>{isRoot ? 'Square Root' : 'Cube Root'} Challenge</h2>
      </div>

      <div className="game-card glass-panel">
        <div className="question-display">
          {mode === 'tables' ? (
            <span className="expression">{question.display} = ?</span>
          ) : (
            <>
              <span className="symbol">{mode === 'cube' ? '∛' : '√'}</span>
              <span className="number">{question.display || question.value}</span>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            ref={inputRef}
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="?"
            className={`answer-input ${feedback || ''}`}
            readOnly={!!feedback}
            autoFocus
          />
          <button type="submit" className="btn-primary submit-btn">
            {feedback ? 'Next Question →' : 'Check Answer'}
          </button>
        </form>

        {feedback === 'correct' && (
          <div className="feedback-message correct">
            Awesome! Great Job! 🎉
            <div className="feedback-hint">(Press Enter for Next)</div>
          </div>
        )}

        {feedback === 'incorrect' && (
          <div className="feedback-message incorrect">
            Oops! The answer was <strong>{lastCorrectAnswer}</strong>
            <div className="feedback-hint">(Press Enter for Next)</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
