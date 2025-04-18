import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'; // Middleware to verify JWT
import Listing from '../models/Listing.js'; // Your MongoDB model for listings

const router = express.Router();

// Route to get listings for the logged-in user
router.get('/user', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the verified token
        const userListings = await Listing.find({ user: userId }); // Fetch listings for the user
        res.json(userListings);
    } catch (error) {
        console.error('Error fetching user listings:', error);
        res.status(500).json({ error: 'Failed to fetch user listings' });
    }
});

export default router;