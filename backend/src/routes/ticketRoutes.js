import express from 'express';
import {
    submitTicket,
    getUserTickets,
    updateTicket,
    deleteTicket,
} from '../controllers/ticketController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit Ticket Booking (protected route)
router.post('/submit', authMiddleware, submitTicket);

// Get all Tickets for the logged-in user (protected route)
router.get('/user', authMiddleware, getUserTickets);

// Update Ticket by the logged-in user (protected route)
router.put('/update/:id', authMiddleware, updateTicket);

// Delete Ticket by the logged-in user (protected route)
router.delete('/delete/:id', authMiddleware, deleteTicket);

export default router;