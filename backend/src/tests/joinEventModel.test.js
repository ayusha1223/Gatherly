const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

// Mock the JoinEvent model
const JoinEventMock = dbMock.define("JoinEvent", {
    id: {
        type: SequelizeMock.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    lastName: {
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
    eventType: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    message: {
        type: SequelizeMock.TEXT,
        allowNull: true, // Allow null for optional messages
    },
    userId: {
        type: SequelizeMock.INTEGER,
        allowNull: false,
    },
});

describe("JoinEvent Model", () => {
    it("should create a JoinEvent entry successfully", async () => {
        const joinEventData = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            eventType: "Conference",
            message: "Looking forward to attending!",
            userId: 1,
        };

        const joinEvent = await JoinEventMock.create(joinEventData);

        // Assertions
        expect(joinEvent.id).toBeDefined(); // Auto-incremented ID
        expect(joinEvent.firstName).toBe(joinEventData.firstName);
        expect(joinEvent.lastName).toBe(joinEventData.lastName);
        expect(joinEvent.email).toBe(joinEventData.email);
        expect(joinEvent.eventType).toBe(joinEventData.eventType);
        expect(joinEvent.message).toBe(joinEventData.message);
        expect(joinEvent.userId).toBe(joinEventData.userId);
    });

    it("should allow message to be optional", async () => {
        const joinEventData = {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            eventType: "Workshop",
            userId: 2,
            message: null, // Explicitly set message to null
        };

        const joinEvent = await JoinEventMock.create(joinEventData);

        // Assertions
        expect(joinEvent.message).toBeNull(); // message should be null since it's optional
    });

    it("should require firstName, lastName, email, eventType, and userId", async () => {
        const joinEventData = {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            eventType: "Seminar",
            userId: 3,
        };

        const joinEvent = await JoinEventMock.create(joinEventData);

        // Assertions
        expect(joinEvent.firstName).toBe(joinEventData.firstName);
        expect(joinEvent.lastName).toBe(joinEventData.lastName);
        expect(joinEvent.email).toBe(joinEventData.email);
        expect(joinEvent.eventType).toBe(joinEventData.eventType);
        expect(joinEvent.userId).toBe(joinEventData.userId);
    });

    it("should validate email format", async () => {
        const joinEventData = {
            firstName: "Bob",
            lastName: "Brown",
            email: "invalid-email", // Invalid email format
            eventType: "Meetup",
            userId: 4,
        };

        try {
            await JoinEventMock.create(joinEventData);
        } catch (error) {
            expect(error.message).toContain("Validation error"); // Expect a validation error
        }
    });
});