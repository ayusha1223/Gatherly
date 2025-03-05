import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import images
import eventoneImg from '../../assets/images/eventone.png';
import eventtwoImg from '../../assets/images/eventtwo.png';
import eventthreeImg from '../../assets/images/eventthree.png';

const Homepage = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        eventName: '',
        eventDate: '',
        eventType: '',
        numberOfGuests: '',
        contactEmail: '',
    });
    const [errors, setErrors] = useState({});

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/; // Assumes a 10-digit phone number
        return regex.test(phoneNumber);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
        else if (!validatePhoneNumber(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number format";
        if (!formData.eventName) newErrors.eventName = "Event Name is required";
        if (!formData.eventDate) newErrors.eventDate = "Event Date is required";
        if (!formData.eventType) newErrors.eventType = "Event Type is required";
        if (!formData.numberOfGuests) newErrors.numberOfGuests = "Number of Guests is required";
        else if (formData.numberOfGuests < 1) newErrors.numberOfGuests = "Number of Guests must be at least 1";
        if (!formData.contactEmail) newErrors.contactEmail = "Contact Email is required";
        else if (!validateEmail(formData.contactEmail)) newErrors.contactEmail = "Invalid email format";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Simulate form submission success
        toast.success("Thank you for your booking! We will get back to you soon.", {
            position: "top-center",
            autoClose: 3000,
        });
        setFormData({
            fullName: '',
            phoneNumber: '',
            eventName: '',
            eventDate: '',
            eventType: '',
            numberOfGuests: '',
            contactEmail: '',
        }); // Reset form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const faqItems = [
        {
            question: "How do I create an event?",
            answer: "You can create an event by filling out a simple form with details like the event name, date, and location."
        },
        {
            question: "Can I edit an event after creating it?",
            answer: "Yes, you can edit event details anytime before the event starts."
        },
        {
            question: "How do I track event registrations?",
            answer: "You can view all registrations and attendee details in the event dashboard."
        },
        {
            question: "Is there a limit to the number of events I can create?",
            answer: "No, you can create as many events as you need."
        },
        {
            question: "How do I contact support?",
            answer: "You can reach out to our support team through the contact form on the website."
        }
    ];

    const tools = [
        {
            title: "Event Creation",
            description: "Create and customize events with detailed information, pricing, and registration options.",
            image: eventoneImg
        },
        {
            title: "Ticket Management",
            description: "Effortlessly manage ticket sales, track registrations, and monitor event attendance.",
            image: eventtwoImg
        },
        {
            
            title: "User-friendly Interface",
            description: "Enjoy a clean and intuitive interface designed to make event management simple and stress-free.",
            image: eventthreeImg
        }
    ];

    return (
        <div className="homepage">
            <ToastContainer />
            <nav className="homepage-navbar">
                <div className="homepage-nav-content">
                    <Link to="/" className="homepage-logo">Gatherly</Link>
                    <div className="homepage-nav-links">
                        <Link to="/join">Events</Link>
                        <Link to="/ticket">Tickets</Link>
                    </div>
                </div>
            </nav>

            <section className="homepage-hero">
                <h1>Welcome to Gatherly</h1>
                <p>Your comprehensive event management platform. Create, manage, and track events with ease.</p>
                <Link to="/create-event" className="homepage-submit-btn">Create Your Event</Link>
            </section>

            <section className="homepage-tools-section">
                <h2>Event Management Tools</h2>
                <div className="homepage-tools-grid">
                    {tools.map((tool, index) => (
                        <div className="homepage-tool-card" key={index}>
                            <img src={tool.image} alt={tool.title} className="homepage-tool-image" />
                            <div className="homepage-tool-overlay">
                                <h3>{tool.title}</h3>
                                <p>{tool.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="booking-content">
                <h1>Book Event Tickets</h1>
                <form onSubmit={handleFormSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone number"
                        />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>
                    <div className="form-group">
                        <label>Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                            placeholder="Enter event name"
                        />
                        {errors.eventName && <span className="error">{errors.eventName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Event Date</label>
                        <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.eventDate && <span className="error">{errors.eventDate}</span>}
                    </div>
                    <div className="form-group">
                        <label>Event Type</label>
                        <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="birthday">Birthday</option>
                            <option value="corporate">Corporate</option>
                            <option value="concert">Concert</option>
                        </select>
                        {errors.eventType && <span className="error">{errors.eventType}</span>}
                    </div>
                    <div className="form-group">
                        <label>Number of Guests</label>
                        <input
                            type="number"
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                        {errors.numberOfGuests && <span className="error">{errors.numberOfGuests}</span>}
                    </div>
                    <div className="form-group">
                        <label>Contact Email</label>
                        <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                        {errors.contactEmail && <span className="error">{errors.contactEmail}</span>}
                    </div>
                    <button type="submit" className="submit-btn">Book Now</button>
                </form>
            </section>

            <section className="homepage-faq">
                <h2>Frequently Asked Questions</h2>
                {faqItems.map((item, index) => (
                    <div className="homepage-faq-item" key={index}>
                        <div
                            className="homepage-faq-question"
                            onClick={() => toggleFaq(index)}
                        >
                            {item.question}
                            <i
                                className="fas fa-chevron-down"
                                style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0)' }}
                            ></i>
                        </div>
                        <div className={`homepage-faq-answer ${activeFaq === index ? 'active' : ''}`}>
                            {item.answer}
                        </div>
                    </div>
                ))}
            </section>

            <footer className="homepage-footer">
                <div className="homepage-copyright">
                    <p>© 2025 EventHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;