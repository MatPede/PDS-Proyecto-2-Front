import React, { useState } from 'react';
//import { login } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { json, useNavigate } from 'react-router-dom';
 


const predefinedCredentials = [
  { email: 'student@mail.com', password: '123456' },
  { email: 'teacher@mail.com', password: '123456' },
  // Add more predefined combinations as needed
];

export const login = (email, password) => {
  const foundUser = predefinedCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (foundUser) {
    return {
      success: true,
      user: foundUser.user,
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

 /*    try {
      const result = await login(email, password);
      console.log('Login successful:', result);
      localStorage.setItem('user', JSON.stringify(result.user));
      setIsLogged(true);
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesion.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    } */
      try {
        const result = await login(email, password);
        if (!result.success) {
          throw new Error('Invalid email or password');
        }
        localStorage.setItem('user', JSON.stringify(result.user));
        setIsLogged(true);
        localStorage.setItem('isLogged', 'true');
        navigate('/');
      } catch (error) {
        setError('Error al iniciar sesion.');
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;