import React from 'react';
import '../../styles/signup.css';
import loginBackground from '../../assets/images/logincard.jpeg'; 

const Signup = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <span>GATHERLY</span>
          <Link to="/" className="home-button">Home</Link>
        </div>
      </header>

      <div className="container">
        <div className="form-container">
          <h1>CREATE NEW ACCOUNT</h1>
          <form id="signupForm">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="First Name" required />
              <span className="error-message" id="firstNameError"></span>
            </div>
          </form>
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