import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TablesDashboard.css';

const TablesDashboard = () => {
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState(null);
    const [range, setRange] = useState({ min: 1, max: 10 });

    // Generate numbers 1 to 30
    const tablesList = Array.from({ length: 30 }, (_, i) => i + 1);

    const handleTableClick = (num) => {
        setSelectedTable(num);
    };

    const closeOverlay = () => {
        setSelectedTable(null);
    };

    const handlePracticeStart = (e) => {
        e.preventDefault();
        navigate(`/practice/tables?min=${range.min}&max=${range.max}`);
    };

    return (
        <div className="tables-container">
            <div className="header-section">
                <Link to="/" className="back-link">← Back</Link>
                <h2 className="title-gradient">Multiplication Tables</h2>
            </div>

            <div className="dashboard-grid">
                {/* Left: Table Selection for Study */}
                <section className="study-section glass-panel">
                    <h3>Study Zone</h3>
                    <p className="section-desc">Tap a number to view its table.</p>
                    <div className="tables-grid">
                        {tablesList.map(num => (
                            <button
                                key={num}
                                className="table-btn"
                                onClick={() => handleTableClick(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Right: Practice Configuration */}
                <section className="practice-config-section glass-panel">
                    <h3>Practice Challenge</h3>
                    <p className="section-desc">Select a range to test your skills.</p>

                    <form onSubmit={handlePracticeStart} className="range-form">
                        <div className="input-group">
                            <label>From Table</label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={range.min}
                                onChange={e => setRange({ ...range, min: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="input-group">
                            <label>To Table</label>
                            <input
                                type="number"
                                min="1"
                                max="30"
                                value={range.max}
                                onChange={e => setRange({ ...range, max: parseInt(e.target.value) })}
                            />
                        </div>

                        <button type="submit" className="btn-primary start-btn">
                            Start Practice
                        </button>
                    </form>
                </section>
            </div>

            {/* Modal/Overlay for Viewing Table */}
            {selectedTable && (
                <div className="modal-overlay" onClick={closeOverlay}>
                    <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeOverlay}>×</button>
                        <h3>Table of {selectedTable}</h3>
                        <div className="table-rows">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(multiplier => (
                                <div key={multiplier} className="table-row">
                                    <span className="factor">{selectedTable}</span>
                                    <span className="x">×</span>
                                    <span className="factor">{multiplier}</span>
                                    <span className="eq">=</span>
                                    <span className="result">{selectedTable * multiplier}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablesDashboard;
