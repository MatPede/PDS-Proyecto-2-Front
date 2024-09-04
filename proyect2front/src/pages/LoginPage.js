import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const predefinedCredentials = [
  { email: 'student@mail.com', password: '123456', name: 'student1' },
  { email: 'teacher@mail.com', password: '123456', name: 'teacher1' },
];

export const login = (email, password) => {
  const foundUser = predefinedCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (foundUser) {
    return {
      success: true,
      user: foundUser, 
    };
  } else {
    return {
      success: false,
      user: null,
    };
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setIsLogged } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = login(email, password);
      if (!result.success) {
        throw new Error('Correo electrónico o contraseña inválidos');
      }
      
      localStorage.setItem('user', JSON.stringify(result.user));

      setIsLogged(true);
      localStorage.setItem('isLogged', 'true');
      navigate('/HomePage');
    } catch (error) {
      setError('Error al iniciar sesión.');
      console.error('Error de inicio de sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <h1>StaticApp</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;