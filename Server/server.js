import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import priceRoutes from './routes/priceRoutes.js';

dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Price suggestion route for GPUs
app.use('/api/price', priceRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
