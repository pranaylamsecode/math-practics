import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import './Practice.css';

const Practice = () => {
  const { mode } = useParams(); // 'root' or 'cube'
  const { updateProgress } = useProgress();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const generateQuestion = () => {
    let base;
    if (mode === 'cube') {
      base = Math.floor(Math.random() * 30) + 1; // 1 to 30 for cubes
    } else {
      base = Math.floor(Math.random() * 100) + 1; // 1 to 100 for roots
    }

    const value = mode === 'cube' ? Math.pow(base, 3) : Math.pow(base, 2);
    return { base, value };
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
    const isCorrect = userVal === question.base;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) setLastCorrectAnswer(question.base);

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
          <span className="symbol">{mode === 'cube' ? '∛' : '√'}</span>
          <span className="number">{question.value}</span>
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
