import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TablesDashboard.css'; // Reuse existing styles for consistency

const CubesDashboard = () => {
    const navigate = useNavigate();

    // Generate numbers 1 to 30
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

    const handlePracticeStart = () => {
        navigate('/practice/cube');
    };

    return (
        <div className="tables-container">
            <div className="header-section">
                <Link to="/" className="back-link">← Back</Link>
                <h2 className="title-gradient">Cube Root Study</h2>
            </div>

            <div className="dashboard-grid">
                {/* Left: Study List */}
                <section className="study-section glass-panel full-width-mobile">
                    <h3>Memorize Cubes</h3>
                    <p className="section-desc">Study the cubes of numbers 1 to 30.</p>

                    <div className="study-list-grid">
                        {numbers.map(num => (
                            <div key={num} className="study-item">
                                <span className="factor">{num}³</span>
                                <span className="eq">=</span>
                                <span className="result">{Math.pow(num, 3)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Right: Practice Action */}
                <section className="practice-config-section glass-panel sticky-panel">
                    <h3>Ready to Test?</h3>
                    <p className="section-desc">Test your knowledge with random questions.</p>
                    <button onClick={handlePracticeStart} className="btn-primary start-btn">
                        Start Practice
                    </button>
                </section>
            </div>
        </div>
    );
};

export default CubesDashboard;
