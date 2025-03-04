import JoinEvent from '../models/JoinEvent.js';

// Submit Join Event Form
export const submitJoinEvent = async (req, res) => {
    const { fullName, email, phone, eventName, ticketType, participants, specialRequirements } = req.body;
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const newJoinEvent = await JoinEvent.create({
            fullName,
            email,
            phone,
            eventName,
            ticketType,
            participants,
            specialRequirements,
            userId,
        });
        res.status(201).json(newJoinEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting form', error });
    }
};

// Get all Join Event Forms for the logged-in user
export const getUserJoinEvents = async (req, res) => {
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const joinEvents = await JoinEvent.findAll({ where: { userId } });
        res.status(200).json(joinEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching forms', error });
    }
};

// Update Join Event Form by the logged-in user
export const updateJoinEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from authenticated user
    const { fullName, email, phone, eventName, ticketType, participants, specialRequirements } = req.body;

    try {
        const joinEvent = await JoinEvent.findOne({ where: { id, userId } });
        if (!joinEvent) {
            return res.status(404).json({ message: 'Form not found or unauthorized' });
        }

        joinEvent.fullName = fullName;
        joinEvent.email = email;
        joinEvent.phone = phone;
        joinEvent.eventName = eventName;
        joinEvent.ticketType = ticketType;
        joinEvent.participants = participants;
        joinEvent.specialRequirements = specialRequirements;

        await joinEvent.save();
        res.status(200).json(joinEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating form', error });
    }
};

// Delete Join Event Form by the logged-in user
export const deleteJoinEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from authenticated user

    try {
        const joinEvent = await JoinEvent.findOne({ where: { id, userId } });
        if (!joinEvent) {
            return res.status(404).json({ message: 'Form not found or unauthorized' });
        }

        await joinEvent.destroy();
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting form', error });
    }
};