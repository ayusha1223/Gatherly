import React, { useState, useEffect } from 'react';
import '../../styles/joinevent.css';

const JoinEvent = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        eventName: '',
        ticketType: 'standard',
        participants: 1,
        specialRequirements: ''
    });

    const [submissions, setSubmissions] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [viewDetails, setViewDetails] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            eventName: '',
            ticketType: 'standard',
            participants: 1,
            specialRequirements: ''
        });
        setEditMode(false);
        setEditIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editMode && editIndex !== null) {
            // Update existing submission
            const updatedSubmissions = [...submissions];
            updatedSubmissions[editIndex] = {
                ...formData,
                id: submissions[editIndex].id,
                submittedAt: submissions[editIndex].submittedAt,
                updatedAt: new Date().toLocaleString()
            };
            setSubmissions(updatedSubmissions);
            setShowToast(true);
            resetForm();
        } else {
            // Add new submission
            const newSubmission = {
                ...formData,
                id: Date.now(), // Simple unique ID
                submittedAt: new Date().toLocaleString()
            };
            setSubmissions([...submissions, newSubmission]);
            setShowToast(true);
            resetForm();
        }
    };

    const handleEdit = (index) => {
        setFormData(submissions[index]);
        setEditMode(true);
        setEditIndex(index);
        setViewDetails(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (index) => {
        const updatedSubmissions = submissions.filter((_, i) => i !== index);
        setSubmissions(updatedSubmissions);
        setViewDetails(null);
        setShowToast(true);
    };

    const handleViewDetails = (index) => {
        if (viewDetails === index) {
            setViewDetails(null);
        } else {
            setViewDetails(index);
        }
    };

    // Toast timer
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <div className="join-event-container">
            {/* Toast notification */}
            {showToast && (
                <div className="toast-notification">
                    <div className="toast-content">
                        <div className="toast-icon">✓</div>
                        <p>{editMode ? "Submission updated successfully!" : "Form submitted successfully!"}</p>
                    </div>
                </div>
            )}

            <div className="join-event-header">
                <h1>{editMode ? 'Edit Your Registration' : 'Join Our Workshop'}</h1>
                <p>{editMode ? 'Update your registration details below' : 'Register below to secure your spot at our upcoming events'}</p>
            </div>

            <div className="join-event-content">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

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

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="ticketType">Ticket Type</label>
                                <select
                                    id="ticketType"
                                    name="ticketType"
                                    value={formData.ticketType}
                                    onChange={handleChange}
                                >
                                    <option value="standard">Standard</option>
                                    <option value="premium">Premium</option>
                                    <option value="vip">VIP</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="participants">Number of Participants</label>
                                <input
                                    type="number"
                                    id="participants"
                                    name="participants"
                                    min="1"
                                    max="10"
                                    value={formData.participants}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialRequirements">Special Requirements</label>
                            <textarea
                                id="specialRequirements"
                                name="specialRequirements"
                                value={formData.specialRequirements}
                                onChange={handleChange}
                                placeholder="Any special requirements or accommodations needed?"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-button">
                                {editMode ? 'Update Registration' : 'Register Now'}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="info-sidebar">
                    <div className="info-card">
                        <h3>Why Join Our Workshops?</h3>
                        <ul>
                            <li>Learn from industry experts</li>
                            <li>Networking opportunities</li>
                            <li>Hands-on experience</li>
                            <li>Certificate of participation</li>
                        </ul>
                    </div>

                    <div className="info-card">
                        <h3>Upcoming Events</h3>
                        <div className="event-item">
                            <span className="event-date">Mar 15</span>
                            <span className="event-title">Digital Marketing Mastery</span>
                        </div>
                        <div className="event-item">
                            <span className="event-date">Apr 02</span>
                            <span className="event-title">Leadership Summit 2025</span>
                        </div>
                        <div className="event-item">
                            <span className="event-date">Apr 18</span>
                            <span className="event-title">Web Development Bootcamp</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submissions Section */}
            {submissions.length > 0 && (
                <div className="submissions-section">
                    <h2>Your Submissions</h2>
                    <div className="submissions-container">
                        {submissions.map((submission, index) => (
                            <div key={submission.id} className="submission-card">
                                <div className="submission-card-header">
                                    <h3>{submission.eventName}</h3>
                                    <div className="submission-card-badges">
                                        <span className="badge badge-ticket">{submission.ticketType}</span>
                                        <span className="badge badge-participants">{submission.participants} {submission.participants > 1 ? 'participants' : 'participant'}</span>
                                    </div>
                                </div>

                                <div className="submission-card-content">
                                    <p><strong>Name:</strong> {submission.fullName}</p>
                                    <p><strong>Submitted:</strong> {submission.submittedAt}</p>
                                    {submission.updatedAt && <p><strong>Updated:</strong> {submission.updatedAt}</p>}
                                </div>

                                <div className="submission-card-actions">
                                    <button
                                        onClick={() => handleViewDetails(index)}
                                        className="btn-view"
                                    >
                                        {viewDetails === index ? 'Hide Details' : 'View Details'}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="btn-edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </div>

                                {viewDetails === index && (
                                    <div className="submission-details">
                                        <div className="details-row">
                                            <div className="detail-item">
                                                <span className="detail-label">Email:</span>
                                                <span className="detail-value">{submission.email}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">{submission.phone || 'Not provided'}</span>
                                            </div>
                                        </div>

                                        {submission.specialRequirements && (
                                            <div className="details-row">
                                                <div className="detail-item full-width">
                                                    <span className="detail-label">Special Requirements:</span>
                                                    <span className="detail-value">{submission.specialRequirements}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinEvent;