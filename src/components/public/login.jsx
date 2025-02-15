import React from 'react';
import '../../styles/login.css';
import '../../App.css';

const Login = () => {
  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">GATHERLY</div>
        <a href="/" className="home-button">Home</a>
      </header>

      <div className="background">
        <div className="login-container">
          <h1>LOGIN TO YOUR ACCOUNT</h1>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username :</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password :</label>
              <input type="password" id="password" placeholder="Enter your password" />
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

