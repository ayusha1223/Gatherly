import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Edit, Trash } from 'lucide-react';
import "../../styles/joinevent.css"

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
  const [events, setEvents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

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
      if (editIndex !== null) {
        // Update existing event
        const updatedEvents = [...events];
        updatedEvents[editIndex] = formData;
        setEvents(updatedEvents);
        setToast({
          type: 'success',
          message: 'Event updated successfully!'
        });
        setEditIndex(null);
      } else {
        // Add new event
        setEvents([...events, formData]);
        setToast({
          type: 'success',
          message: 'Event registration successful!'
        });
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        eventType: '',
        message: ''
      });
      setTimeout(() => {
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
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(events[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    setToast({
      type: 'success',
      message: 'Event deleted successfully!'
    });
    setTimeout(() => {
      setToast(null);
    }, 3000);
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
                  {editIndex !== null ? 'Update Event' : 'Register for Event'}
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
          <div className="events-list">
            <h2>Registered Events</h2>
            {events.length > 0 ? (
              <ul>
                {events.map((event, index) => (
                  <li key={index}>
                    <div className="event-details">
                      <p><strong>Name:</strong> {event.firstName} {event.lastName}</p>
                      <p><strong>Email:</strong> {event.email}</p>
                      <p><strong>Event Type:</strong> {event.eventType}</p>
                      <p><strong>Message:</strong> {event.message}</p>
                    </div>
                    <div className="event-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events registered yet.</p>
            )}
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