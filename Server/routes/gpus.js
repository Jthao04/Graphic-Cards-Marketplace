import express from 'express';
import multer from 'multer';
import Listing from '../models/Listing.js'; // Use the Listing model
import { verifyToken } from '../middleware/authMiddleware.js'; // Ensure only authenticated users can post

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;

    const userId = req.user.id; // Extracted from the token
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to post a listing.' });
    }

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
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;