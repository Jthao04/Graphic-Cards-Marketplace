import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware.js';
import GpuListing from '../models/GpuListing.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ GET: Fetch all GPU listings for the logged-in user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    const userListings = await GpuListing.find({ userId }).sort({ createdAt: -1 }); // Fetch listings for the user
    res.status(200).json(userListings);
  } catch (err) {
    console.error('Error fetching user listings:', err);
    res.status(500).json({ error: 'Failed to fetch user listings' });
  }
});

// ✅ POST: Create a new GPU listing
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;

    const userId = req.user.id; // Extract user ID from the token

    // If an image is uploaded, convert the image file to base64
    let imageData = null;
    let imageType = null;

    if (req.file) {
      imageData = req.file.buffer.toString('base64'); // Convert image to base64
      imageType = req.file.mimetype; // Get MIME type
    }

    const newListing = new GpuListing({
      gpuName,
      description,
      category,
      condition,
      sellerPrice,
      imageData,
      imageType,
      userId,
    });

    const savedListing = await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: savedListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// ✅ DELETE: Delete a GPU listing (only if it belongs to the logged-in user)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user.id;

    const listing = await GpuListing.findOneAndDelete({ _id: listingId, userId });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or unauthorized' });
    }

    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error deleting listing:', err);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

export default router;