import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import './Home.css';

const Home = () => {
  const { progress } = useProgress();

  const getAccuracy = (mode) => {
    if (progress[mode].total === 0) return 0;
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
        </div>
      </header>

      <div className="actions-grid">
        <Link to="/practice/root" className="action-card glass-panel">
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

        <Link to="/practice/cube" className="action-card glass-panel">
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
      </div>
    </div>
  );
};

export default Home;
