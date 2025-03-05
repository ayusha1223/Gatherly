import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import '../../styles/booking.css';

const BookTickets = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    numberOfGuests: 1,
    eventType: '',
    contactEmail: '',
  });

  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState('Booking');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.eventName || !formData.eventDate || !formData.eventType || !formData.contactEmail) {
      setToast({ type: 'error', message: 'Please fill in all required fields!' });
    } else {
      setToast({ type: 'success', message: 'Booking submitted successfully!' });
      console.log('Form Data Submitted:', formData);
      setFormData({
        eventName: '',
        eventDate: '',
        numberOfGuests: 1,
        eventType: '',
        contactEmail: '',
      });
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="booking-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === 'success' ? <CheckCircle color="green" /> : <AlertCircle color="red" />}
            </div>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="logo">GATHERLY</div>
        <nav className="nav-links">
          <a href="/home" className={activeNav === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveNav('Home')}>Home</a>
          <a href="/booking" className={activeNav === 'Booking' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveNav('Booking')}>Booking</a>
          <a href="/logout" className={activeNav === 'Logout' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveNav('Logout')}>Logout</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="booking-content">
        <h1>Book Event Tickets</h1>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Event Name</label>
            <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required placeholder="Enter event name" />
          </div>

          <div className="form-group">
            <label>Event Date</label>
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Event Type</label>
            <select name="eventType" value={formData.eventType} onChange={handleChange} required>
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate</option>
              <option value="concert">Concert</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Guests</label>
            <input type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} min="1" required />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required placeholder="Enter your email" />
          </div>

          <button type="submit" className="submit-btn">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default BookTickets;
