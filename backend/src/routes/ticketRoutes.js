import express from 'express';
import {
    addTicket,
    getUserTickets,
    updateTicket,
    deleteTicket,
} from '../controllers/ticketController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a new ticket (protected route)
router.post('/add', authMiddleware, addTicket);

// Get all tickets for the logged-in user (protected route)
router.get('/user', authMiddleware, getUserTickets);

// Update a ticket by the logged-in user (protected route)
router.put('/update/:id', authMiddleware, updateTicket);

// Delete a ticket by the logged-in user (protected route)
router.delete('/delete/:id', authMiddleware, deleteTicket);

export default router;