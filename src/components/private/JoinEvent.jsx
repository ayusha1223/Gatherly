import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const JoinEvent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventType: '',
    message: ''
  });
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState('BookEvents');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(field => field.trim() !== '')) {
      setToast({
        type: 'success',
        message: 'Event registration successful!'
      });
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          eventType: '',
          message: ''
        });
        setToast(null);
      }, 3000);
    } else {
      setToast({
        type: 'error',
        message: 'Please fill out all fields.'
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      eventType: '',
      message: ''
    });
  };

  return (
    <div className="gatherly-theme">
      <header className="gatherly-header">
        <div className="header-content">
          <div className="logo">GATHERLY</div>
          <nav className="main-nav">
            <a 
              href="/home" 
              className={activeNav === 'Home' ? 'active' : ''}
              onClick={() => setActiveNav('Home')}
            >
              Home
            </a>
            <a 
              href="/join" 
              className={activeNav === 'BookEvents' ? 'active' : ''}
              onClick={() => setActiveNav('BookEvents')}
            >
              Join
            </a>
            <a 
              href="/logout" 
              className={activeNav === 'logout' ? 'active' : ''}
              onClick={() => setActiveNav('logout')}
            >
              Logout
            </a>
          </nav>
        </div>
      </header>

      <div className="join-event-container">
        <div className="join-event-header">
          <h1>Join Our Event</h1>
          <p>Fill out the form below to register for an upcoming event.</p>
        </div>
        <div className="join-event-content">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="webinar">Webinar</option>
                  <option value="seminar">Seminar</option>
                  <option value="networking">Networking Event</option>
                  <option value="fundraiser">Fundraiser</option>
                  <option value="panel">Panel Discussion</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Register for Event
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {toast && (
        <div className="toast-notification">
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === 'success' 
                ? <CheckCircle color="green" /> 
                : <AlertCircle color="red" />
              }
            </div>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinEvent;
