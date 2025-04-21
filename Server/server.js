import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import gpuRoutes from './routes/gpus.js';
import listingsRoutes from './routes/listingsRoutes.js'; 
import cors from 'cors';
import path from 'path';
import fs from 'fs'; 
import mime from 'mime'; 

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware for CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', 
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

// Apply CORS for all routes
app.use(cors(corsOptions)); 

app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve uploaded images with CORS headers 
app.use('/uploads', (req, res, next) => {
    const filePath = path.join(process.cwd(), 'uploads', req.path);

    if (fs.existsSync(filePath)) {
        const mimeType = mime.getType(filePath);
        res.setHeader('Content-Type', mimeType || 'application/octet-stream');
        res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:3000');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

// Routes
app.use('/api/listings', listingsRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/gpus', gpuRoutes);

// Handle invalid API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
