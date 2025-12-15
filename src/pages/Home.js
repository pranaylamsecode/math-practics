import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import './Home.css';

const Home = () => {
  const { progress } = useProgress();

  const getAccuracy = (mode) => {
    if (!progress[mode] || progress[mode].total === 0) return 0;
    return Math.round((progress[mode].correct / progress[mode].total) * 100);
  };

  return (
    <div className="dashboard-container">
      <header className="hero-section glass-panel">
        <h2 className="title-gradient">Master Your Math Skills</h2>
        <p className="subtitle">Select a challenge to begin your journey.</p>

        <div className="stats-overview">
          <div className="stat-card">
            <h3>Square Root</h3>
            <div className={`stat-value ${getAccuracy('root') > 80 ? 'good' : ''}`}>
              {getAccuracy('root')}%
            </div>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-card">
            <h3>Cube Root</h3>
            <div className={`stat-value ${getAccuracy('cube') > 80 ? 'good' : ''}`}>
              {getAccuracy('cube')}%
            </div>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-card">
            <h3>Tables</h3>
            <div className={`stat-value ${getAccuracy('tables') > 80 ? 'good' : ''}`}>
              {getAccuracy('tables') || 0}%
            </div>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
      </header>

      <div className="actions-grid">
        <Link to="/roots" className="action-card glass-panel">
          <div className="card-icon root-icon">√</div>
          <div className="card-content">
            <h3>Square Root Practice</h3>
            <p>Find the square root of perfect squares.</p>
            <span className="streak-badge">
              🔥Streak: {progress.root.streak}
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/cubes" className="action-card glass-panel">
          <div className="card-icon cube-icon">³√</div>
          <div className="card-content">
            <h3>Cube Root Practice</h3>
            <p>Calculate cube roots of perfect cubes.</p>
            <span className="streak-badge">
              🔥Streak: {progress.cube.streak}
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/tables" className="action-card glass-panel">
          <div className="card-icon table-icon">×</div>
          <div className="card-content">
            <h3>Multiplication Tables</h3>
            <p>Study tables 1-30 or take a challenge.</p>
            <span className="streak-badge">
              🔥Streak: {progress.tables ? progress.tables.streak : 0}
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/formulas" className="action-card glass-panel formulas-card">
          <div className="card-icon formulas-icon">📚</div>
          <div className="card-content">
            <h3>Math Formulas</h3>
            <p>All important formulas & shortcuts.</p>
            <span className="streak-badge">
              ⭐ Quick Reference
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/reasoning" className="action-card glass-panel reasoning-card">
          <div className="card-icon reasoning-icon">🧠</div>
          <div className="card-content">
            <h3>Reasoning</h3>
            <p>Logical & analytical reasoning topics.</p>
            <span className="streak-badge">
              💡 Study Guide
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/english" className="action-card glass-panel english-card">
          <div className="card-icon english-icon">📖</div>
          <div className="card-content">
            <h3>English</h3>
            <p>Grammar, vocabulary & comprehension.</p>
            <span className="streak-badge">
              ✍️ Language Guide
            </span>
          </div>
          <div className="card-arrow">→</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
