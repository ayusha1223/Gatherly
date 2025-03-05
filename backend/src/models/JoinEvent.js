// import React, { useState, useEffect } from 'react';
// import { Trash2, Edit, Ticket } from 'lucide-react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../../styles/ticket.css';

// // Header Component
// const Header = () => {
//     return (
//         <header className="tickets-header-full">
//             <div className="header-content">
//                 <div className="header-logo">
//                     <Ticket size={40} />
//                     <h1>Gatherly</h1>
//                 </div>
//                 <nav className="header-nav">
//                     <a href="#" className="nav-link">Home</a>
//                     <a href="#" className="nav-link">Events</a>
//                     <a href="#" className="nav-link">Tickets</a>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// // Banner Component
// const Banner = () => {
//     return (
//         <div className="banner">
//             <div className="banner-content">
//                 <h2>Art Exhibition</h2>
//             </div>
//         </div>
//     );
// };

// // TicketForm Component
// const TicketForm = ({ ticket, onSubmit, isEditing }) => {
//     const [formData, setFormData] = useState({
//         id: null,
//         fullName: '',
//         email: '',
//         phone: '',
//         eventName: '',
//         ticketType: '',
//         quantity: 1,
//         paymentMethod: '',
//         specialRequests: ''
//     });

//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         setFormData(ticket || {
//             id: null,
//             fullName: '',
//             email: '',
//             phone: '',
//             eventName: '',
//             ticketType: '',
//             quantity: 1,
//             paymentMethod: '',
//             specialRequests: ''
//         });
//         setErrors({});
//     }, [ticket]);

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
//         if (!formData.email.trim()) newErrors.email = 'Email is required';
//         if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
//         if (!formData.eventName.trim()) newErrors.eventName = 'Event Name is required';
//         if (!formData.ticketType) newErrors.ticketType = 'Ticket Type is required';
//         if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             onSubmit(formData);
//             setFormData({
//                 id: null,
//                 fullName: '',
//                 email: '',
//                 phone: '',
//                 eventName: '',
//                 ticketType: '',
//                 quantity: 1,
//                 paymentMethod: '',
//                 specialRequests: ''
//             });
//             setErrors({});
//         }
//     };

//     return (
//         <div className="ticket-form-container">
//             <h2 className="ticket-form-title">
//                 {isEditing ? 'Edit Ticket' : 'Create New Ticket'}
//             </h2>
//             <form onSubmit={handleSubmit} className="ticket-form">
//                 <div className="form-row">
//                     <div className="form-group">
//                         <label>Full Name</label>
//                         <input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             className={`form-input ${errors.fullName ? 'input-error' : ''}`}
//                         />
//                         {errors.fullName && <p className="error-message">{errors.fullName}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className={`form-input ${errors.email ? 'input-error' : ''}`}
//                         />
//                         {errors.email && <p className="error-message">{errors.email}</p>}
//                     </div>
//                 </div>

//                 <div className="form-row">
//                     <div className="form-group">
//                         <label>Phone</label>
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className={`form-input ${errors.phone ? 'input-error' : ''}`}
//                         />
//                         {errors.phone && <p className="error-message">{errors.phone}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label>Event Name</label>
//                         <input
//                             type="text"
//                             name="eventName"
//                             value={formData.eventName}
//                             onChange={handleChange}
//                             className={`form-input ${errors.eventName ? 'input-error' : ''}`}
//                         />
//                         {errors.eventName && <p className="error-message">{errors.eventName}</p>}
//                     </div>
//                 </div>

//                 <div className="form-row">
//                     <div className="form-group">
//                         <label>Ticket Type</label>
//                         <select
//                             name="ticketType"
//                             value={formData.ticketType}
//                             onChange={handleChange}
//                             className={`form-input ${errors.ticketType ? 'input-error' : ''}`}
//                         >
//                             <option value="">Select Ticket Type</option>
//                             <option value="standard">Standard</option>
//                             <option value="vip">VIP</option>
//                             <option value="premium">Premium</option>
//                         </select>
//                         {errors.ticketType && <p className="error-message">{errors.ticketType}</p>}
//                     </div>
//                     <div className="form-group">
//                         <label>Quantity</label>
//                         <input
//                             type="number"
//                             name="quantity"
//                             value={formData.quantity}
//                             onChange={handleChange}
//                             min="1"
//                             className={`form-input ${errors.quantity ? 'input-error' : ''}`}
//                         />
//                         {errors.quantity && <p className="error-message">{errors.quantity}</p>}
//                     </div>
//                 </div>

//                 <div className="form-group">
//                     <label>Special Requests</label>
//                     <textarea
//                         name="specialRequests"
//                         value={formData.specialRequests}
//                         onChange={handleChange}
//                         className="form-input"
//                         rows="3"
//                     />
//                 </div>

//                 <div className="form-actions">
//                     <button type="submit" className="btn-submit">
//                         {isEditing ? 'Update Ticket' : 'Create Ticket'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// // TicketList Component
// const TicketList = ({ tickets, onEdit, onDelete }) => {
//     return (
//         <div className="ticket-list-container">
//             <h2 className="ticket-list-title">Ticket List</h2>
//             {tickets.length === 0 ? (
//                 <p className="no-tickets">No tickets found.</p>
//             ) : (
//                 <table className="ticket-table">
//                     <thead>
//                         <tr>
//                             <th>Event Name</th>
//                             <th>Ticket Type</th>
//                             <th>Quantity</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tickets.map((ticket) => (
//                             <tr key={ticket.id}>
//                                 <td>{ticket.eventName}</td>
//                                 <td>{ticket.ticketType}</td>
//                                 <td>{ticket.quantity}</td>
//                                 <td className="action-buttons">
//                                     <button
//                                         onClick={() => onEdit(ticket)}
//                                         className="btn-edit"
//                                         title="Edit Ticket"
//                                     >
//                                         <Edit size={20} />
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(ticket.id)}
//                                         className="btn-delete"
//                                         title="Delete Ticket"
//                                     >
//                                         <Trash2 size={20} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// // Main Tickets Component
// const Tickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const [selectedTicket, setSelectedTicket] = useState(null);

//     // Fetch tickets from the API
//     useEffect(() => {
//         const fetchTickets = async () => {
//             try {
//                 const response = await axios.get('/api/tickets/user', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setTickets(response.data);
//             } catch (error) {
//                 toast.error('Error fetching tickets. Please try again.');
//             }
//         };

//         fetchTickets();
//     }, []);

//     const handleCreateTicket = async (newTicket) => {
//         try {
//             const response = await axios.post('/api/tickets/add', newTicket, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setTickets([...tickets, response.data]);
//             setSelectedTicket(null);
//             toast.success('Ticket created successfully!');
//         } catch (error) {
//             toast.error('Error creating ticket. Please try again.');
//         }
//     };

//     const handleEditTicket = async (updatedTicket) => {
//         try {
//             const response = await axios.put(`/api/tickets/update/${updatedTicket.id}`, updatedTicket, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const updatedTickets = tickets.map(ticket =>
//                 ticket.id === updatedTicket.id ? response.data : ticket
//             );
//             setTickets(updatedTickets);
//             setSelectedTicket(null);
//             toast.success('Ticket updated successfully!');
//         } catch (error) {
//             toast.error('Error updating ticket. Please try again.');
//         }
//     };

//     const handleDeleteTicket = async (ticketId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
//         if (confirmDelete) {
//             try {
//                 await axios.delete(`/api/tickets/delete/${ticketId}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
//                 setTickets(updatedTickets);
//                 toast.success('Ticket deleted successfully!');
//             } catch (error) {
//                 toast.error('Error deleting ticket. Please try again.');
//             }
//         }
//     };

//     return (
//         <>
//             <Header />
//             <Banner />
//             <div className="tickets-container">
//                 <div className="tickets-grid">
//                     <TicketForm
//                         ticket={selectedTicket}
//                         onSubmit={selectedTicket ? handleEditTicket : handleCreateTicket}
//                         isEditing={!!selectedTicket}
//                     />
//                     <TicketList
//                         tickets={tickets}
//                         onEdit={setSelectedTicket}
//                         onDelete={handleDeleteTicket}
//                     />
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

// export default Tickets;