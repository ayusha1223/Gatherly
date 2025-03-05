import express from 'express';
import { createBooking, getUserBookings, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/bookings', createBooking);

// Get all bookings for a user
router.get('/bookings/:userId', getUserBookings);

// Get all bookings (for admin)
router.get('/bookings', getAllBookings);

export default router;