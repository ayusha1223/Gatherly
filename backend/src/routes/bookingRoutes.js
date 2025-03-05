import express from "express";
import {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateRemarks,
    deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/bookings", createBooking);

// Get all bookings for a user
router.get("/bookings/:userId", getUserBookings);

// Get all bookings (for admin)
router.get("/bookings", getAllBookings);

// Update remarks for a booking
router.put("/bookings/:id/remarks", updateRemarks);

// Delete a booking
router.delete("/bookings/:id", deleteBooking);

export default router;