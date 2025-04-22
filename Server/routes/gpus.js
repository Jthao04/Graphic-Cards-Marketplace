import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET / - Public route to fetch all GPU listings with optional filters
 */
router.get('/', async (req, res) => {
  try {
    const { category, condition } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (condition) filter.condition = condition;

    const listings = await GpuListing.find(filter)
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
});

/**
 * POST / - Protected route to create a new GPU listing
 */
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;
    const userId = req.user.id || req.user._id; // Adjust based on your token payload

    let imageData = null;
    let imageType = null;

    if (req.file) {
      imageData = req.file.buffer.toString('base64');
      imageType = req.file.mimetype;
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

    await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: newListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /user - Protected route to fetch listings for the logged-in user
 */
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id; // Adjust depending on JWT token structure
    const userListings = await GpuListing.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(userListings);
  } catch (err) {
    console.error('Error fetching user listings:', err);
    res.status(500).json({ error: 'Server error while fetching user listings' });
  }
});

export default router;
