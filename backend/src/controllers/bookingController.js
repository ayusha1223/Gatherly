import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const {
        fullName,
        phoneNumber,
        eventName,
        eventDate,
        numberOfGuests,
        eventType,
        contactEmail,
        userId,
    } = req.body;

    try {
        const booking = await Booking.create({
            fullName,
            phoneNumber,
            eventName,
            eventDate,
            numberOfGuests,
            eventType,
            contactEmail,
            userId,
            remarks: null, // Remarks is null initially
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

// Update remarks for a booking (admin only)
export const updateRemarks = async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;

    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.remarks = remarks;
        await booking.save();

        res.status(200).json({ message: 'Remarks updated successfully', booking });
    } catch (error) {
        console.error('Error updating remarks:', error);
        res.status(500).json({ message: 'Error updating remarks', error });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.destroy();
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};