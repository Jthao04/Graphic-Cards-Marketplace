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

// Route to delete a specific listing
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const listingId = req.params.id;
        const userId = req.user.id; // Extracted from the token

        // Ensure the listing belongs to the logged-in user
        const listing = await Listing.findOneAndDelete({ _id: listingId, user: userId });

        if (!listing) {
            return res.status(404).json({ error: "Listing not found or unauthorized" });
        }

        res.json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({ error: "Failed to delete listing" });
    }
});

export default router;