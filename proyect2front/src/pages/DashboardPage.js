import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; 

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Rozamiento y Poleas</h1>
      <p>Tareas:</p>
      <div className="button-group">
        <Link to="/alternativas" className="btn">
          Test de Alternativas
        </Link>
        <Link to="/calculo" className="btn">
          Test de Desarrollo
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;