import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import sequelize from './src/config/db.js';
import joinEventRoutes from './src/routes/joinEventRoutes.js';
import ticketRoutes from './src/routes/ticketRoutes.js'; 
import User from './src/models/User.js';
import JoinEvent from './src/models/JoinEvent.js';
import Ticket from './src/models/Ticket.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/join-event', joinEventRoutes);
app.use('/api/ticket', ticketRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
