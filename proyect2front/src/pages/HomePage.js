import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <div className="card" onClick={() => handleNavigation('/dashboard')}>
        <div className="card-content">
          <h2>Rozamiento y poleas</h2>
        </div>
      </div>
      <div className="card card-upcoming">
        <div className="card-content">
          <h2>Próximamente...</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
