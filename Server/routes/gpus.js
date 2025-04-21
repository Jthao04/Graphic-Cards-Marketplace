import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';

const router = express.Router();

// Get all GPU listings and populate the user's email
router.get('/', async (req, res) => {
  try {
    const listings = await GpuListing.find()
      .populate('userId', 'email')  // Populate userId field with email
      .sort({ createdAt: -1 });     // Sort by most recent first

    res.status(200).json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for creating a new GPU listing
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition, userId } = req.body;

    // Check if userId is present
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to post a listing.' });
    }

    // If an image is uploaded convert the image file to base64
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
      imageData,  // Store base64 image data
      imageType,  // Store MIME type
      userId
    });

    await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: newListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
