import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const JoinEvent = sequelize.define('JoinEvent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // Ensure the email is valid
        },
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true, // Allow null for optional messages
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
    tableName: 'JoinEvents', // Custom table name
    timestamps: true, // Add createdAt and updatedAt timestamps
});

export default JoinEvent;