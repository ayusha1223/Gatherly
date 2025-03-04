import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const JoinEvent = sequelize.define('JoinEvent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ticketType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    participants: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specialRequirements: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    tableName: 'JoinEvents', // Explicitly set the table name
    timestamps: true, // Adds createdAt and updatedAt fields
});

export default JoinEvent;