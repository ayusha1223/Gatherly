import React from 'react';
import '../../styles/home.css'; // Make sure your CSS file is set up
import { Link } from 'react-router-dom'; // For handling navigation if using React Router

const LandingPage = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <span>GATHERLY</span>
        </div>
        <nav className="nav">
          <Link to="/home1" className="nav-link">Home</Link> {/* Link to Home Page */}
          <Link to="/booking" className="nav-link">Booking</Link> {/* Link to Booking Page */}
          <Link to="/login" className="nav-link">Logout</Link> {/* Link to Login Page */}
        </nav>
      </header>

      {/* Background Section */}
      <div className="background">
        <div className="lined-frame">
          <div className="content">
            <h1 className="title">Gatherly</h1>
            <div className="subtitle">
              <span className="subtitle-text">CONNECT.PLAN.CELEBRATE</span>
            </div>
            <button className="cta-button" onClick={() => window.location.href = '/home'}>GET STARTED</button> {/* Link to Booking Page */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-image">
            <img src="Testimonials (2).png" alt="Elegant woman" />
          </div>
          <div className="hero-text">
            <h1>Welcome To Gatherly</h1>
            <p>
              Gatherly makes event planning effortless and enjoyable. With just a few clicks, you can easily book or join events,
              and our intuitive management tools help you coordinate and connect with attendees seamlessly. We also prioritize
              eco-friendly practices, ensuring your gatherings are sustainable and reduce waste. Whether hosting or attending,
              Gatherly ensures your events are memorable and hassle-free!
            </p>
            
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>WHY US?</h2>
        <div className="service-container">
          <div className="service">
            <i className="icon">💡</i>
            <h3>Simple & Safe</h3>
            <p>Enjoy an userfriendly interface with security.</p>
            <Link to="#">Learn More →</Link>
          </div>
          <div className="service active">
            <i className="icon">❤️</i>
            <h3>Create Events</h3>
            <p>Easily set up events with our simple form.</p>
            <Link to="#">Learn More →</Link>
          </div>
          <div className="service">
            <i className="icon">🚀</i>
            <h3>Join Events</h3>
            <p>Discover exciting local events.</p>
            <Link to="#">Learn More →</Link>
          </div>
          <div className="service">
            <i className="icon">📈</i>
            <h3>Secure Tickets</h3>
            <p>Safe and reliable ticket booking for many events.</p>
            <Link to="#">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h2>Gatherly</h2>
            <p>The main purpose of Gatherly is to simplify the planning, organizing, and execution of events.</p>
            <ul>
              <li>📞 +1 23 456 789</li>
              <li>📧 support@gatherly.ai</li>
              <li>📍 456 Event Lane, CO, USA</li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/home1">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-socials">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i>🔗</i>Facebook</a>
              <a href="#"><i>🔗</i>Instagram</a>
              <a href="#"><i>🔗</i>Email</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 GATHERLY. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
