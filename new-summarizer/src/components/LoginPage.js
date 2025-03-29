import React, { useState } from 'react';
import { login } from './api/api';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = await login(email, password);
      localStorage.setItem('authToken', token);
      setMessage('Login successful!');
      navigate('/categories');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <div style={styles.page}>
      {isAuthenticated && (
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      )}
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username / Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
        {message && <div style={styles.message}>{message}</div>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark black background
    fontFamily: 'Arial, sans-serif',
    color: '#f5f5f5', // Light gray text
  },
  container: {
    backgroundColor: '#1e1e1e', // Dark gray background
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Stronger shadow for depth
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#ffffff', // White text
  },
  input: {
    marginBottom: '15px',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #444', // Subtle border
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#2c2c2c', // Darker gray input background
    color: '#f5f5f5', // Light gray text
  },
  error: {
    color: '#ff4d4d', // Bright red for errors
    fontSize: '14px',
    marginBottom: '15px',
  },
  message: {
    color: '#4caf50', // Bright green for success messages
    fontSize: '14px',
    marginBottom: '15px',
  },
  button: {
    padding: '12px 20px',
    width: '100%',
    backgroundColor: '#007bff', // Blue button background
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Subtle shadow
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#dc3545', // Red for logout
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#f5f5f5', // Light gray text
  },
  link: {
    color: '#007bff', // Blue for links
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.2s',
  },
};

export default LoginPage;