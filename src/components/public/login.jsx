import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService'; // Import the login function
import '../../styles/login.css';
import '../../App.css';
import { CheckCircle, XCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!email || !password) {
      setToast({ type: 'error', message: 'All fields are required' });
      return;
    }

    if (!validateEmail(email)) {
      setToast({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    if (password.length < 8) {
      setToast({ type: 'error', message: 'Password must be at least 8 characters long' });
      return;
    }

    try {
      // Call the login API
      const response = await login({ email, password });
      setToast({ type: 'success', message: 'Login successful!' });
      navigate('/home'); // Redirect to dashboard or another page
    } catch (error) {
      setToast({ type: 'error', message: error.response?.data?.message || 'Login failed. Please try again.' });
    }
  };

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="login-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <XCircle size={20} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <header className="header">
        <div className="logo">GATHERLY</div>
        <a href="/" className="home-button">Home</a>
      </header>

      <div className="background">
        <div className="login-container">
          <h1>LOGIN TO YOUR ACCOUNT</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </p>

            <button type="submit" className="login-btn">LOGIN</button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up now</a>
          </p>
        </div>
      </div>

      <div className="contact-info">
        <p>📞 Phone: +123 456 7890</p>
        <p>✉ E-Mail: hello@gatherly.com</p>
      </div>
    </div>
  );
};

export default Login;