import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';


dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));