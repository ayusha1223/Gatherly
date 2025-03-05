import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const { eventName, eventDate, numberOfGuests, eventType, contactEmail, userId } = req.body;

    try {
        const booking = await Booking.create({
            eventName,
            eventDate,
            numberOfGuests,
            eventType,
            contactEmail,
            userId,
        });

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.findAll({ where: { userId } });
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Get all bookings (for admin)
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({ message: 'Error fetching all bookings', error });
    }
};