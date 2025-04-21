import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import Listing from '../models/Listing.js';

const router = express.Router();

// Get listings for the logged-in user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userListings = await Listing.find({ user: userId });
    res.json(userListings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Failed to fetch user listings' });
  }
});

// Delete a specific listing (owned by user)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user.id;

    const listing = await Listing.findOneAndDelete({ _id: listingId, user: userId });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

export default router;
