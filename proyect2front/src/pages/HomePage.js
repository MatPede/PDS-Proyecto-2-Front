import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  console.log("isLogged homepage =", isLogged); // Imprime el valor de isLogged en la consola

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
