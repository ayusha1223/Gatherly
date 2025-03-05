import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
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
  const [existingEmails, setExistingEmails] = useState(["test@example.com", "user@gatherly.com"]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[a-zA-Z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^a-zA-Z0-9]/.test(password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(null);
    let validationErrors = {};

    // Field validation
    if (!formData.firstName.trim()) validationErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) validationErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    } else if (existingEmails.includes(formData.email)) {
      validationErrors.email = 'Email is already registered';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      validationErrors.password = 'Password must contain 8+ chars with letter, number, and special character';
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.termsAccepted) {
      validationErrors.termsAccepted = 'You must accept the terms & conditions';
    }

    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors).join(', ');
      setToast({ type: 'error', message: errorMessage });
      return;
    }

    // Success case
    setToast({ type: 'success', message: 'Account created successfully! Redirecting to login...' });
    setExistingEmails([...existingEmails, formData.email]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
    
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="signup-page-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`signup-page-toast ${toast.type ? `signup-page-toast-${toast.type}` : ''}`}>
          <div className="signup-page-toast-content">
            {toast.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <XCircle size={20} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <header className="signup-page-header">
        <div className="signup-page-header-logo">GATHERLY</div>
        <a href="/" className="signup-page-header-home">Home</a>
      </header>

      <div className="signup-page-form">
        <div className="signup-page-form-container">
          <h1 className="signup-page-form-title">CREATE NEW ACCOUNT</h1>

          <form onSubmit={handleSubmit}>
            <div className="signup-page-form-input">
              <label htmlFor="firstName" className="signup-page-form-input-label">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                className="signup-page-form-input-field"
                placeholder="Enter your First Name" 
                value={formData.firstName} 
                onChange={handleChange} 
              />
            </div>

            <div className="signup-page-form-input">
              <label htmlFor="lastName" className="signup-page-form-input-label">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                className="signup-page-form-input-field"
                placeholder="Enter your Last Name" 
                value={formData.lastName} 
                onChange={handleChange} 
              />
            </div>

            <div className="signup-page-form-input">
              <label htmlFor="email" className="signup-page-form-input-label">Email</label>
              <input 
                type="email" 
                name="email" 
                className="signup-page-form-input-field"
                placeholder="Enter your Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="signup-page-form-input">
              <label htmlFor="password" className="signup-page-form-input-label">Password</label>
              <input 
                type="password" 
                name="password" 
                className="signup-page-form-input-field"
                placeholder="Enter your Password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>

            <div className="signup-page-form-input">
              <label htmlFor="confirmPassword" className="signup-page-form-input-label">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                className="signup-page-form-input-field"
                placeholder="Confirm Password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
              />
            </div>

            <div className="signup-page-form-input-terms">
              <input 
                type="checkbox" 
                name="termsAccepted" 
                className="signup-page-form-input-terms-checkbox"
                checked={formData.termsAccepted} 
                onChange={handleChange} 
              />
              <label className="signup-page-form-input-terms-label">
                I agree to the <a href="/terms" target="_blank" className="signup-page-form-input-terms-link">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="signup-page-form-submit">Sign up</button>
          </form>

          <div className="signup-page-form-account-link">
            <p>Already have an account? <a href="/login" className="signup-page-form-account-link-text">Login</a></p>
          </div>
        </div>
      </div>
      
      <div className="signup-page-contact">
        <p>📞 Phone: +123 456 7890</p>
        <p>✉ E-Mail: hello@gatherly.com</p>
      </div>
    </div>
  );
};

export default Signup;

