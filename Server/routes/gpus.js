import express from 'express';
import multer from 'multer';
import Listing from '../models/Listing.js'; // Use the Listing model
import { verifyToken } from '../middleware/authMiddleware.js'; // Ensure only authenticated users can post

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST: Create a new GPU listing
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;

    // Check if the user is authenticated
    const userId = req.user.id; // Extracted from the token
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to post a listing.' });
    }

    // If an image is uploaded, convert the image file to base64
    let imageData = null;
    let imageType = null;

    if (req.file) {
      imageData = req.file.buffer.toString('base64'); // Convert image to base64
      imageType = req.file.mimetype; // Get MIME type
    }

    // Create a new listing
    const newListing = new Listing({
      title: gpuName,
      description,
      category,
      price: sellerPrice,
      condition,
      image: imageData ? `data:${imageType};base64,${imageData}` : undefined, // Save base64 image if provided
      user: userId, // Associate the listing with the logged-in user
    });

    const savedListing = await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: savedListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;