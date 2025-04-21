import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import Listing from '../models/Listing.js';

const router = express.Router();

// ✅ GET: Fetch listings for the logged-in user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching listings for user:', userId);

    const userListings = await Listing.find({ user: userId });

    res.json(userListings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ error: 'Failed to fetch user listings' });
  }
});

// ✅ POST: Create a new listing (authenticated)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newListing = new Listing({
      ...req.body,
      user: req.user.id, // tie the listing to the logged-in user
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// ✅ DELETE: Delete a listing (only if it belongs to the logged-in user)
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
