import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/booking.css';

const Booking = () => {
    const [step, setStep] = useState(1); 
    const [locationType, setLocationType] = useState('Virtual'); 
    const [privacy, setPrivacy] = useState('Public'); 

    const nextStep = () => {
        if (step < 3) setStep(step + 1); 
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1); 
    };

    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <span>GATHERLY</span>
                </div>
                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/booking" className="nav-link">Booking</Link>
                    <Link to="/attendees" className="nav-link">Attendees</Link>
                    <Link to="/signup" className="nav-link">Signup</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </nav>
            </header>

            {/* Event Creation Form */}
            <div className="event-container">
                <div className="event-box">
                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <span className={`step ${step === 1 ? 'active' : ''}`}>Details</span>
                        <span className={`step ${step === 2 ? 'active' : ''}`}>Date & Location</span>
                        <span className={`step ${step === 3 ? 'active' : ''}`}>Guests</span>
                    </div>

                    {/* Form Steps */}
                    <form id="eventForm">
                        {/* Step 1: Event Details */}
                        {step === 1 && (
                            <div className="form-step step-1 active">
                                <h2>What's your event about?</h2>
                                <label>Title</label>
                                <input type="text" placeholder="Enter event title" required />

                                <label>Category</label>
                                <select required>
                                    <option value="Book Fair">Book Fair</option>
                                    <option value="Graduation">Graduation</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Charity">Charity</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Meetings">Meetings</option>
                                    <option value="Health & Wellbeing">Health & Wellbeing</option>
                                    <option value="Art & Culture">Art & Culture</option>
                                    <option value="Workshops">Workshops</option>
                                </select>

                                <label>Description</label>
                                <textarea placeholder="Add a short description..."></textarea>

                                <div className="buttons">
                                    <button type="button" className="next-btn" onClick={nextStep}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Date & Location */}
                        {step === 2 && (
                            <div className="form-step step-2 active">
                                <h2>When and where will it take place?</h2>

                                <label>Date</label>
                                <input type="date" required />

                                <label>Time</label>
                                <div className="time-inputs">
                                    <input type="time" required /> to <input type="time" required />
                                </div>

                                <label>Location</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="location"
                                            value="Physical"
                                            checked={locationType === 'Physical'}
                                            onChange={() => setLocationType('Physical')}
                                        />{' '}
                                        Physical
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="location"
                                            value="Virtual"
                                            checked={locationType === 'Virtual'}
                                            onChange={() => setLocationType('Virtual')}
                                        />{' '}
                                        Virtual
                                    </label>
                                </div>

                                {locationType === 'Virtual' ? (
                                    <input
                                        type="text"
                                        placeholder="Link to the meeting (if virtual)"
                                    />
                                ) : (
                                    <input type="text" placeholder="Location details" />
                                )}

                                <div className="buttons">
                                    <button type="button" className="prev-btn" onClick={prevStep}>
                                        Back
                                    </button>
                                    <button type="button" className="next-btn" onClick={nextStep}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Guests */}
                        {step === 3 && (
                            <div className="form-step step-3 active">
                                <h2>Who should join it?</h2>

                                <label>Event Privacy</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value="Public"
                                            checked={privacy === 'Public'}
                                            onChange={() => setPrivacy('Public')}
                                        />{' '}
                                        Public
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value="Private"
                                            checked={privacy === 'Private'}
                                            onChange={() => setPrivacy('Private')}
                                        />{' '}
                                        Private
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value="Restricted"
                                            checked={privacy === 'Restricted'}
                                            onChange={() => setPrivacy('Restricted')}
                                        />{' '}
                                        Restricted
                                    </label>
                                </div>

                                {(privacy === 'Private' || privacy === 'Restricted') && (
                                    <div id="guest-count-container">
                                        <label>Number of Guests</label>
                                        <input type="number" min="1" placeholder="Enter guest count" />
                                    </div>
                                )}

                                <div className="checkbox-group">
                                    <label>
                                        I agree to the{' '}
                                        <Link to="/terms" className="terms-link">
                                            Terms & Conditions
                                        </Link>
                                    </label>
                                </div>

                                <div className="buttons">
                                    <button type="button" className="prev-btn" onClick={prevStep}>
                                        Back
                                    </button>
                                    <button type="submit" className="submit-btn">
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Booking;
