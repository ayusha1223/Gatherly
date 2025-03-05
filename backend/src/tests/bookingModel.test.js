const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

// Mock the Booking model
const BookingMock = dbMock.define("Booking", {
    id: {
        type: SequelizeMock.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    eventName: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    eventDate: {
        type: SequelizeMock.DATE,
        allowNull: false,
    },
    numberOfGuests: {
        type: SequelizeMock.INTEGER,
        allowNull: false,
    },
    eventType: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    contactEmail: {
        type: SequelizeMock.STRING,
        allowNull: false,
    },
    userId: {
        type: SequelizeMock.INTEGER,
        allowNull: false,
    },
    remarks: {
        type: SequelizeMock.TEXT,
        allowNull: true,
    },
});

describe("Booking Model", () => {
    it("should create a booking entry successfully", async () => {
        const bookingData = {
            fullName: "Jane Doe",
            phoneNumber: "0987654321",
            eventName: "Birthday Party",
            eventDate: new Date(),
            numberOfGuests: 50,
            eventType: "Birthday",
            contactEmail: "jane@example.com",
            userId: 2,
            remarks: "Need a cake with 'Happy Birthday Jane' written on it.",
        };

        const booking = await BookingMock.create(bookingData);

        // Assertions
        expect(booking.id).toBeDefined(); // Auto-incremented ID
        expect(booking.fullName).toBe(bookingData.fullName);
        expect(booking.phoneNumber).toBe(bookingData.phoneNumber);
        expect(booking.eventName).toBe(bookingData.eventName);
        expect(booking.eventDate).toEqual(bookingData.eventDate);
        expect(booking.numberOfGuests).toBe(bookingData.numberOfGuests);
        expect(booking.eventType).toBe(bookingData.eventType);
        expect(booking.contactEmail).toBe(bookingData.contactEmail);
        expect(booking.userId).toBe(bookingData.userId);
        expect(booking.remarks).toBe(bookingData.remarks);
    });

    it("should allow remarks to be optional", async () => {
        const bookingData = {
            fullName: "John Doe",
            phoneNumber: "1234567890",
            eventName: "Wedding",
            eventDate: new Date(),
            numberOfGuests: 100,
            eventType: "Wedding",
            contactEmail: "john@example.com",
            userId: 1,
            remarks: null, // Explicitly set remarks to null
        };

        const booking = await BookingMock.create(bookingData);

        // Assertions
        expect(booking.remarks).toBeNull(); // remarks should be null since it's optional
    });

    it("should require all non-optional fields", async () => {
        const bookingData = {
            fullName: "John Doe",
            phoneNumber: "1234567890",
            eventName: "Wedding",
            eventDate: new Date(),
            numberOfGuests: 100,
            eventType: "Wedding",
            contactEmail: "john@example.com",
            userId: 1,
        };

        const booking = await BookingMock.create(bookingData);

        // Assertions
        expect(booking.fullName).toBe(bookingData.fullName);
        expect(booking.phoneNumber).toBe(bookingData.phoneNumber);
        expect(booking.eventName).toBe(bookingData.eventName);
        expect(booking.eventDate).toEqual(bookingData.eventDate);
        expect(booking.numberOfGuests).toBe(bookingData.numberOfGuests);
        expect(booking.eventType).toBe(bookingData.eventType);
        expect(booking.contactEmail).toBe(bookingData.contactEmail);
        expect(booking.userId).toBe(bookingData.userId);
    });
});