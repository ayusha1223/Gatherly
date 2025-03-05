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
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.subject) newErrors.subject = "Subject is required";
        else if (formData.subject.length > 50) newErrors.subject = "Subject must be less than 50 characters";
        if (!formData.message) newErrors.message = "Message is required";
        else if (formData.message.length > 500) newErrors.message = "Message must be less than 500 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Simulate form submission success
        toast.success("Thank you for your message! We will get back to you soon.", {
            position: "top-center",
            autoClose: 3000,
        });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const faqItems = [
        {
            question: "How can Gatherly help me manage events?",
            answer: "EventHub offers comprehensive tools for creating, managing, and tracking events. From simple meetups to large conferences, our platform simplifies event organization."
        },
        {
            question: "What features are available for event creation?",
            answer: "Our platform allows you to create detailed event listings, manage registrations, track attendees, and customize event details with ease."
        },
        {
            question: "Can I manage multiple events?",
            answer: "Yes! EventHub lets you create, track, and manage multiple events simultaneously, with intuitive dashboard and tracking capabilities."
        },
        {
            question: "Is ticket management complicated?",
            answer: "Not at all! Our ticket management system is straightforward, allowing you to set pricing, track sales, and manage attendee information seamlessly."
        },
        {
            question: "How secure is the event registration process?",
            answer: "We prioritize security and user experience. Our registration process is encrypted and designed to protect both event organizers and attendees."
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
            title: "Event Tracking",
            description: "Get comprehensive insights and analytics for your events with our robust tracking system.",
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

            <section className="homepage-help-section">
                <div className="homepage-help-form">
                    <h2>Need Help?</h2>
                    <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                    <form id="helpForm" onSubmit={handleFormSubmit}>
                        <div className="homepage-form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="homepage-form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="homepage-form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            {errors.subject && <span className="error">{errors.subject}</span>}
                        </div>
                        <div className="homepage-form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>
                        <button type="submit" className="homepage-submit-btn">Submit</button>
                    </form>
                </div>
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

