import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Reference the User model
            key: 'id',
        },
    },
}, {
    tableName: 'bookings',
    timestamps: true,
});

export default Booking;