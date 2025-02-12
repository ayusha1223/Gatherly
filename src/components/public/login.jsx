import React from 'react';
import '../../styles/login.css';
import loginBackground from '../../assets/images/logincard.jpeg'; 

const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <header className="header">
        <div className="logo">
          <span>GATHERLY</span>
          <a href="/" className="home-button">Home</a>
        </div>
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
