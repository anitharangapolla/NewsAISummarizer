import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from './api/api';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const token = await signup(name, email, password);
      localStorage.setItem('authToken', token);
      setMessage('Signup successful!');
      navigate('/categories');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create an Account</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <div style={styles.error}>{error}</div>}
          {message && <div style={styles.message}>{message}</div>}
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
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
  inputFocus: {
    borderColor: '#007bff', // Blue border on focus
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
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
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
  linkHover: {
    color: '#0056b3', // Darker blue on hover
  },
};

export default SignUpPage;