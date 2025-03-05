import Ticket from '../models/Ticket.js';

// Submit Ticket Booking
export const submitTicket = async (req, res) => {
    const { fullName, email, phone, eventName, ticketType, quantity, paymentMethod, specialRequests } = req.body;
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const newTicket = await Ticket.create({
            fullName,
            email,
            phone,
            eventName,
            ticketType,
            quantity,
            paymentMethod,
            specialRequests,
            userId,
        });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting ticket', error });
    }
};

// Get all Tickets for the logged-in user
export const getUserTickets = async (req, res) => {
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const tickets = await Ticket.findAll({ where: { userId } });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

// Update Ticket by the logged-in user
export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from authenticated user
    const { fullName, email, phone, eventName, ticketType, quantity, paymentMethod, specialRequests } = req.body;

    try {
        const ticket = await Ticket.findOne({ where: { id, userId } });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized' });
        }

        ticket.fullName = fullName;
        ticket.email = email;
        ticket.phone = phone;
        ticket.eventName = eventName;
        ticket.ticketType = ticketType;
        ticket.quantity = quantity;
        ticket.paymentMethod = paymentMethod;
        ticket.specialRequests = specialRequests;

        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};

// Delete Ticket by the logged-in user
export const deleteTicket = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const ticket = await Ticket.findOne({ where: { id, userId } });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized' });
        }

        await ticket.destroy();
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};