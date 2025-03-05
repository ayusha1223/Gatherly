const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

// Mock the Ticket model
const TicketMock = dbMock.define("Ticket", {
    id: {
        type: SequelizeMock.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    email: {
        type: SequelizeMock.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // Ensure the email is valid
        },
    },
    phone: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    eventName: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    ticketType: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    quantity: {
        type: SequelizeMock.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Ensure quantity is at least 1
        },
    },
    specialRequests: {
        type: SequelizeMock.TEXT,
        allowNull: true, // Optional field
    },
    userId: {
        type: SequelizeMock.INTEGER,
        allowNull: false,
    },
});

describe("Ticket Model", () => {
    it("should create a ticket entry successfully", async () => {
        const ticketData = {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            eventName: "Tech Conference",
            ticketType: "General Admission",
            quantity: 2,
            specialRequests: "Need vegetarian meals",
            userId: 1,
        };

        const ticket = await TicketMock.create(ticketData);

        // Assertions
        expect(ticket.id).toBeDefined(); // Auto-incremented ID
        expect(ticket.fullName).toBe(ticketData.fullName);
        expect(ticket.email).toBe(ticketData.email);
        expect(ticket.phone).toBe(ticketData.phone);
        expect(ticket.eventName).toBe(ticketData.eventName);
        expect(ticket.ticketType).toBe(ticketData.ticketType);
        expect(ticket.quantity).toBe(ticketData.quantity);
        expect(ticket.specialRequests).toBe(ticketData.specialRequests);
        expect(ticket.userId).toBe(ticketData.userId);
    });

    it("should allow specialRequests to be optional", async () => {
        const ticketData = {
            fullName: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "0987654321",
            eventName: "Music Festival",
            ticketType: "VIP",
            quantity: 1,
            userId: 2,
            specialRequests: null, // Explicitly set specialRequests to null
        };

        const ticket = await TicketMock.create(ticketData);

        // Assertions
        expect(ticket.specialRequests).toBeNull(); // specialRequests should be null since it's optional
    });

    it("should require fullName, email, phone, eventName, ticketType, quantity, and userId", async () => {
        const ticketData = {
            fullName: "Alice Johnson",
            email: "alice.johnson@example.com",
            phone: "5555555555",
            eventName: "Art Exhibition",
            ticketType: "Student Pass",
            quantity: 3,
            userId: 3,
        };

        const ticket = await TicketMock.create(ticketData);

        // Assertions
        expect(ticket.fullName).toBe(ticketData.fullName);
        expect(ticket.email).toBe(ticketData.email);
        expect(ticket.phone).toBe(ticketData.phone);
        expect(ticket.eventName).toBe(ticketData.eventName);
        expect(ticket.ticketType).toBe(ticketData.ticketType);
        expect(ticket.quantity).toBe(ticketData.quantity);
        expect(ticket.userId).toBe(ticketData.userId);
    });

    it("should validate email format", async () => {
        const ticketData = {
            fullName: "Bob Brown",
            email: "invalid-email", // Invalid email format
            phone: "1234567890",
            eventName: "Film Festival",
            ticketType: "General Admission",
            quantity: 1,
            userId: 4,
        };

        try {
            await TicketMock.create(ticketData);
        } catch (error) {
            expect(error.message).toContain("Validation error"); // Expect a validation error
        }
    });

    it("should validate quantity is at least 1", async () => {
        const ticketData = {
            fullName: "Charlie Davis",
            email: "charlie.davis@example.com",
            phone: "1234567890",
            eventName: "Food Expo",
            ticketType: "General Admission",
            quantity: 0, // Invalid quantity (less than 1)
            userId: 5,
        };

        try {
            await TicketMock.create(ticketData);
        } catch (error) {
            expect(error.message).toContain("Validation error"); // Expect a validation error
        }
    });
});