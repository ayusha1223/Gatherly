import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/signup.css';
import '../../App.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [existingEmails, setExistingEmails] = useState(["test@example.com", "user@gatherly.com"]);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== 'termsAccepted' && !formData[key]) {
        validationErrors[key] = 'This field is required';
      }
    });

    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Email must be a valid email address';
    }

    if (existingEmails.includes(formData.email)) {
      validationErrors.email = 'Email is already in use';
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password = 'Password must be at least 8 characters, include one letter, one number, and one special character';
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      validationErrors.termsAccepted = 'You must accept the Terms & Conditions';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Signup Successful!');
      setExistingEmails([...existingEmails, formData.email]);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      });
      navigate('/login');
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <div className="logo">GATHERLY</div>
        <a href="/" className="home-button">Home</a>
      </header>

      <div className="container">
        <div className="form-container">
          <h1>CREATE NEW ACCOUNT</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" placeholder="Enter your First Name" value={formData.firstName} onChange={handleChange} required />
              {errors.firstName && <p className="error">⚠ {errors.firstName}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" placeholder="Enter your Last Name" value={formData.lastName} onChange={handleChange} required />
              {errors.lastName && <p className="error">⚠ {errors.lastName}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="error">⚠ {errors.email}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter your Password" value={formData.password} onChange={handleChange} required />
              {errors.password && <p className="error">⚠ {errors.password}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <p className="error">⚠ {errors.confirmPassword}</p>}
            </div>

            <div className="input-group terms">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
              <label>
                I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
              </label>
              {errors.termsAccepted && <p className="error">⚠ {errors.termsAccepted}</p>}
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
