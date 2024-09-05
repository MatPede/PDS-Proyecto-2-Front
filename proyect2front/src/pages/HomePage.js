import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import rozamientoPoleasImg from '../images/rozamientoypoleas.png';  
import relojImg from '../images/reloj.png';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuth();


  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage-container">
      <div className="card" onClick={() => handleNavigation('/dashboard')}>
        <div className="card-content">
          <h2>Rozamiento y poleas</h2>
          <img src={rozamientoPoleasImg} alt="Rozamiento y Poleas" className="home-image" /> 
        </div>
      </div>
      <div className="card card-upcoming">
        <div className="card-content">
          <h2>Próximamente...</h2>
          <img src={relojImg} alt="Cargando" className="reloj-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
