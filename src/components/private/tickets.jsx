import React, { useState } from 'react';
import { Trash2, Edit, Ticket } from 'lucide-react';
import '../../styles/ticket.css';

const Header = () => {
  return (
    <header className="tickets-header-full">
      <div className="header-content">
        <div className="header-logo">
          <Ticket size={40} />
          <h1>Event Ticket Management</h1>
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Events</a>
          <a href="#" className="nav-link">My Tickets</a>
          <a href="#" className="nav-link">Profile</a>
        </nav>
      </div>
    </header>
  );
};

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Create and Manage Your Event Tickets</h2>
        <p>Simplify your event ticketing process with our user-friendly platform</p>
      </div>
    </div>
  );
};

const TicketForm = ({ ticket, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState(ticket || {
    id: null,
    fullName: '',
    email: '',
    phone: '',
    eventName: '',
    ticketType: '',
    quantity: 1,    
    paymentMethod: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="ticket-form-container">
      <h2 className="ticket-form-title">
        {isEditing ? 'Edit Ticket' : 'Create New Ticket'}
      </h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ticket Type</label>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select Ticket Type</option>
              <option value="standard">Standard</option>
              <option value="vip">VIP</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="form-input"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
          >
            {isEditing ? 'Update Ticket' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
};

const TicketList = ({ tickets, onEdit, onDelete }) => {
  return (
    <div className="ticket-list-container">
      <h2 className="ticket-list-title">Ticket List</h2>
      {tickets.length === 0 ? (
        <p className="no-tickets">No tickets found.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Ticket Type</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.eventName}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.quantity}</td>
                <td className="action-buttons">
                  <button 
                    onClick={() => onEdit(ticket)}
                    className="btn-edit"
                    title="Edit Ticket"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => onDelete(ticket.id)}
                    className="btn-delete"
                    title="Delete Ticket"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Tickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      eventName: 'Summer Music Festival',
      ticketType: 'vip',
      quantity: 2,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      paymentMethod: 'credit',
      specialRequests: 'Wheelchair accessible seats'
    }
  ]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleCreateTicket = (newTicket) => {
    const ticketWithId = { 
      ...newTicket, 
      id: tickets.length + 1 
    };
    setTickets([...tickets, ticketWithId]);
    setSelectedTicket(null);
  };

  const handleEditTicket = (updatedTicket) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(null);
  };

  const handleDeleteTicket = (ticketId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
    if (confirmDelete) {
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
      setTickets(updatedTickets);
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <div className="tickets-container">
        <div className="tickets-grid">
          <TicketForm 
            ticket={selectedTicket} 
            onSubmit={selectedTicket ? handleEditTicket : handleCreateTicket}
            isEditing={!!selectedTicket}
          />
          <TicketList 
            tickets={tickets} 
            onEdit={setSelectedTicket}
            onDelete={handleDeleteTicket}
          />
        </div>
      </div>
    </>
  );
};

export default Tickets;