import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { reasoningQuestions } from '../data/reasoningQuestions';
import './ReasoningPractice.css';

const ReasoningPractice = () => {
    const { topic } = useParams();
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [timerActive, setTimerActive] = useState(true);

    const questions = reasoningQuestions[topic] || [];
    const totalQuestions = questions.length;

    // Timer countdown
    useEffect(() => {
        if (!timerActive || showFeedback || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleTimeout();
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerActive, showFeedback, gameOver, currentQuestion]);

    const handleTimeout = () => {
        setShowFeedback(true);
        setIsCorrect(false);
        setTimerActive(false);
    };

    const handleAnswerClick = (index) => {
        if (showFeedback) return;

        setSelectedAnswer(index);
        const correct = index === questions[currentQuestion].correct;
        setIsCorrect(correct);
        setShowFeedback(true);
        setTimerActive(false);

        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setIsCorrect(false);
            setTimeLeft(60);
            setTimerActive(true);
        } else {
            setGameOver(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowFeedback(false);
        setIsCorrect(false);
        setTimeLeft(60);
        setGameOver(false);
        setTimerActive(true);
    };

    if (!questions.length) {
        return (
            <div className="practice-container">
                <div className="error-message glass-panel">
                    <h2>Topic Not Found</h2>
                    <p>Practice questions for this topic are not available yet.</p>
                    <Link to="/reasoning" className="btn-primary">← Back to Reasoning</Link>
                </div>
            </div>
        );
    }

    if (gameOver) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="practice-container">
                <div className="game-over glass-panel">
                    <div className="trophy-icon">{percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '📚'}</div>
                    <h2 className="title-gradient">Quiz Complete!</h2>
                    <div className="final-score">
                        <div className="score-circle">
                            <span className="score-value">{percentage}%</span>
                        </div>
                        <p className="score-text">{score} out of {totalQuestions} correct</p>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleRestart} className="btn-primary">
                            🔄 Try Again
                        </button>
                        <Link to="/reasoning" className="btn-secondary">
                            ← Back to Topics
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="practice-container">
            <div className="practice-header">
                <Link to="/reasoning" className="back-link">← Back</Link>
                <div className="score-display">Score: {score}/{totalQuestions}</div>
            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className={`question-card glass-panel ${showFeedback ? 'feedback-mode' : ''}`}>
                <div className="question-header">
                    <span className="question-number">Question {currentQuestion + 1}/{totalQuestions}</span>
                    <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
                        ⏱️ {timeLeft}s
                    </div>
                </div>

                <h3 className="question-text">{question.question}</h3>

                <div className="options-grid">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            disabled={showFeedback}
                            className={`option-btn ${showFeedback && index === question.correct ? 'correct' : ''
                                } ${showFeedback && index === selectedAnswer && !isCorrect ? 'wrong' : ''
                                } ${selectedAnswer === index && !showFeedback ? 'selected' : ''
                                }`}
                        >
                            <span className="option-label">{String.fromCharCode(65 + index)}</span>
                            <span className="option-text">{option}</span>
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className={`feedback-panel ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
                        <div className="feedback-icon">
                            {isCorrect ? '✅' : '❌'}
                        </div>
                        <div className="feedback-content">
                            <h4>{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                            <p className="explanation">{question.explanation}</p>
                        </div>
                        <button onClick={handleNext} className="btn-primary next-btn">
                            {currentQuestion < totalQuestions - 1 ? 'Next Question →' : 'View Results'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReasoningPractice;
