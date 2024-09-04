import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './TopBar.css'; 

const TopBar = () => {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth(); 

  const handleLogout = () => {
    setIsLogged(false); 
    localStorage.removeItem('isLogged'); // Elimina el estado de isLogged del localStorage
    navigate('/login'); 
  };

  const handleHome = () => {
    navigate('/HomePage'); 
  };

  // Obtener el nombre del usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.name : '';

  return (
    <div className="top-bar">
      <div className="logo" onClick={handleHome}>StaticApp</div>
      <nav className="navigation">
        {userName && <span>{userName}</span>}
        <a href="#!" onClick={handleLogout}>Cerrar Sesión</a> 
      </nav>
    </div>
  );
};

export default TopBar;
