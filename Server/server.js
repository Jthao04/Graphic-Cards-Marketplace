import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import gpuRoutes from './routes/gpus.js'; 
import cors from 'cors';
import path from 'path';

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'https://graphic-cards-marketplace-1.onrender.com' })); // Replace with your frontend's deployed domain
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/gpus', gpuRoutes);

// Handle invalid API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));