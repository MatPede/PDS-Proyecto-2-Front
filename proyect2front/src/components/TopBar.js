import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './TopBar.css'; 

const TopBar = () => {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth(); 

  const handleLogout = () => {
    setIsLogged(false); 
    navigate('/login'); 
  };

  //const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="top-bar">
      <div className="logo">HourManagement</div>
      <nav className="navigation">
        <a href="/">Clientes</a>
        <a href="/profile">
            <span>Perfil</span>
        </a>
        <a href="#!" onClick={handleLogout}>Cerrar Sesión</a> 
      </nav>
    </div>
  );
};

export default TopBar;