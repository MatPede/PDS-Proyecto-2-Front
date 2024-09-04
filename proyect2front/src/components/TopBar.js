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

  const handleHome = () => {
    navigate('/'); 
  };

  //const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="top-bar">
      <div className="logo" onClick={handleHome}>StaticApp</div>
      <nav className="navigation">
        <a href="#!" onClick={handleLogout}>Cerrar Sesión</a> 
      </nav>
    </div>
  );
};

export default TopBar;