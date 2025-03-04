import express from 'express';
import {
    submitJoinEvent,
    getUserJoinEvents,
    updateJoinEvent,
    deleteJoinEvent,
} from '../controllers/joinEventController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit Join Event Form (protected route)
router.post('/submit', authMiddleware, submitJoinEvent);

// Get all Join Event Forms for the logged-in user (protected route)
router.get('/user', authMiddleware, getUserJoinEvents);

// Update Join Event Form by the logged-in user (protected route)
router.put('/update/:id', authMiddleware, updateJoinEvent);

// Delete Join Event Form by the logged-in user (protected route)
router.delete('/delete/:id', authMiddleware, deleteJoinEvent);

export default router;