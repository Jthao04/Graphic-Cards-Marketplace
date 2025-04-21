import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';

const router = express.Router();

// Get all GPU listings
router.get('/', async (req, res) => {
  try {
    const listings = await GpuListing.find().sort({ createdAt: -1 }); // Most recent first
    res.status(200).json(listings);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ error: 'Server error while fetching listings' });
  }
});

// File storage to 'uploads/' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition, userId } = req.body;

    // Check if userId is present
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to post a listing.' });
    }

    const newListing = new GpuListing({
      gpuName,
      description,
      category,
      condition,
      sellerPrice,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
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
