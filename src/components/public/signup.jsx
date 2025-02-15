import React from 'react';
import '../../styles/signup.css';
import '../../App.css';

const Signup = () => {
  return (
    <div className="signup-page">
      <header className="header">
        <div className="logo">GATHERLY</div>
        <a href="/" className="home-button">Home</a>
      </header>
      
      <div className="container">
        <div className="form-container">
          <h1>CREATE NEW ACCOUNT</h1>
          <form>
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="Enter your First Name" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Enter your Last Name" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your Email" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your Password" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm Password" required />
            </div>
            
            <div className="input-group terms">
              <input type="checkbox" id="termsCheckbox" required />
              <label htmlFor="termsCheckbox">
                I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
              </label>
            </div>
            
            <button type="submit" className="submit-btn">Sign up</button>
          </form>
          
          <div className="account-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
      
      <div className="contact-info">
        <p>📞 Phone: +123 456 7890</p>
        <p>✉ E-Mail: hello@gatherly.com</p>
      </div>
    </div>
  );
};

export default Signup;     