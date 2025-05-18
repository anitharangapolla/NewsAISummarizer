import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from './api/api'; // ✅ Make sure this file exists

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); // Set loading to true when the form is being submitted

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false); // Reset loading when error occurs
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await signup(name, email, password, confirmPassword);
      localStorage.setItem('authToken', response.token || '');
      setMessage('Signup successful!');
      setLoading(false);
      navigate('/categories');
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      setLoading(false);
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
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
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
    backgroundColor: '#121212',
    fontFamily: 'Arial, sans-serif',
    color: '#f5f5f5',
  },
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    marginBottom: '15px',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #444',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#2c2c2c',
    color: '#f5f5f5',
  },
  error: {
    color: '#ff4d4d',
    fontSize: '14px',
    marginBottom: '15px',
  },
  message: {
    color: '#4caf50',
    fontSize: '14px',
    marginBottom: '15px',
  },
  button: {
    padding: '12px 20px',
    width: '100%',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#f5f5f5',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignUpPage;
