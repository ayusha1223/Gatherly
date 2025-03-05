import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle } from 'lucide-react';
import "../../styles/ticket.css";

const Ticket = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventName: "",
    ticketType: "standard",
    participants: 1,
    specialRequirements: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [toast, setToast] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [activeNav, setActiveNav] = useState("BookEvents");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      eventName: "",
      ticketType: "standard",
      participants: 1,
      specialRequirements: "",
    });
    setEditMode(false);
    setEditIndex(null);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode && editIndex !== null) {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[editIndex] = {
        ...formData,
        id: submissions[editIndex].id,
        submittedAt: submissions[editIndex].submittedAt,
        updatedAt: new Date().toLocaleString(),
      };
      setSubmissions(updatedSubmissions);
      showToast("Ticket updated successfully!", "success");
      resetForm();
    } else {
      const newSubmission = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toLocaleString(),
      };
      setSubmissions([...submissions, newSubmission]);
      showToast("Ticket booked successfully!", "success");
      resetForm();
    }
  };

  const handleEdit = (index) => {
    setFormData(submissions[index]);
    setEditMode(true);
    setEditIndex(index);
    setViewDetails(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const updatedSubmissions = submissions.filter((_, i) => i !== index);
    setSubmissions(updatedSubmissions);
    setViewDetails(null);
    showToast("Ticket deleted successfully!", "error");
  };

  return (
    <div className="gatherly-theme">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          <div className="toast-content">
            <div className="toast-icon">
              {toast.type === "success" ? <CheckCircle color="green" /> : <AlertCircle color="red" />}
            </div>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="gatherly-header">
        <div className="header-content">
          <div className="logo">GATHERLY</div>
          <nav className="main-nav">
            <a href="/home" className={activeNav === "Home" ? "active" : ""} onClick={() => setActiveNav("Home")}>
              Home
            </a>
            <a href="/join" className={activeNav === "BookEvents" ? "active" : ""} onClick={() => setActiveNav("BookEvents")}>
              Join Event
            </a>
            <a href="/logout" className={activeNav === "logout" ? "active" : ""} onClick={() => setActiveNav("logout")}>
              Logout
            </a>
          </nav>
        </div>
      </header>

      <div className="ticket-page-header">
        <h1>{editMode ? "Update Your Ticket" : "Book Your Ticket"}</h1>
        <p>{editMode ? "Modify your ticket details below" : "Reserve your spot now for an amazing experience"}</p>
      </div>

      <div className="join-event-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} required placeholder="Enter event name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ticketType">Ticket Type</label>
                <select id="ticketType" name="ticketType" value={formData.ticketType} onChange={handleChange}>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="participants">Number of Participants</label>
                <input type="number" id="participants" name="participants" min="1" max="10" value={formData.participants} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialRequirements">Special Requirements</label>
              <textarea id="specialRequirements" name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Any special requirements?" rows="3"></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                {editMode ? "Update Registration" : "Register Now"}
              </button>
              {editMode && (
                <button type="button" className="cancel-button" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ticket;


