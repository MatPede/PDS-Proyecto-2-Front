
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import TopBar from './components/TopBar';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import AlternativasPage from './pages/Tasks/AlternativasPage'
import CalculoPage from './pages/Tasks/CalculoPage'
import ForceDiagram from './pages/Tasks/ForceDiagram'

const AppRoutes = () => {
  const { isLogged } = useAuth();

  return (
    <>
      {isLogged && <TopBar />}
      <div style={{ paddingTop: isLogged ? '47px' : '0px' }}> 
        <Routes>
          <Route
            path="/login"
            element={!isLogged ? <LoginPage /> : <Navigate to="/HomePage" />}
          />
          <Route
            path="/"
            element={isLogged ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLogged ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isLogged ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/alternativas"
            element={isLogged ? <AlternativasPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/calculo"
            element={isLogged ? <CalculoPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/forcediagram"
            element={isLogged ? <ForceDiagram /> : <Navigate to="/login" />}
          />
          <Route
            path="/student"
            element={isLogged ? <StudentPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;