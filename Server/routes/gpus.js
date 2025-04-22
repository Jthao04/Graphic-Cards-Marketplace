import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all GPU listings and populate the user's email
router.get('/', verifyToken, async (req, res) => { // Add verifyToken middleware
  try {
    const { category, condition } = req.query;

    // Build filter object
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (condition) {
      filter.condition = condition;
    }

    // Fetch listings with filters and populate the user's email
    const listings = await GpuListing.find(filter)
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
});

// POST route for creating a new GPU listing
router.post('/', verifyToken, upload.single('image'), async (req, res) => { // Add verifyToken middleware
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;

    // Use the authenticated user's ID from the token
    const userId = req.user._id;

    // If an image is uploaded, convert the image file to base64
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
      imageData, // Store base64 image data
      imageType, // Store MIME type
      userId,    // Use the authenticated user's ID
    });

    await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: newListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const listings = await Gpu.find({ userId: req.params.userId });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;