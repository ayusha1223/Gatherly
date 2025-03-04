import React, { useState } from 'react';
import '../../styles/booking.css';

const BookTickets = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    numberOfGuests: 1,
    eventType: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data to the backend
    console.log('Form Data Submitted:', formData);
    alert('Booking submitted successfully!');
  };

  return (
    <div className="booking-page">
      {/* Header */}
      <header className="booking-header">
        <div className="logo">GATHERLY</div>
        <nav className="booking-nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/book-tickets" className="nav-link active">Book Tickets</a>
          <a href="/logout" className="nav-link">Logout</a>
        </nav>
      </header>

      {/* Book Tickets Form */}
      <div className="booking-container">
        <h1 className="booking-title">Book Tickets</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              placeholder="Enter event name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday Party</option>
              <option value="corporate">Corporate Event</option>
              <option value="conference">Conference</option>
              <option value="concert">Concert</option>
              <option value="workshop">Workshop</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfGuests">Number of Guests</label>
            <input
              type="number"
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              placeholder="Enter contact email"
            />
          </div>

          <button type="submit" className="book-now-btn">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default BookTickets;