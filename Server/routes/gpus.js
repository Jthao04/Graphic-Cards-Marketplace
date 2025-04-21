import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';

const router = express.Router();

// PUT route for updating a GPU listing
router.put('/:id', async (req, res) => {
  try {
    const { gpuName, description, category, sellerPrice, condition } = req.body;

    const updatedListing = await GpuListing.findByIdAndUpdate(
      req.params.id,
      { gpuName, description, category, sellerPrice, condition },
      { new: true }  // Return the updated listing
    );

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(updatedListing);
  } catch (err) {
    console.error('Error updating listing:', err);
    res.status(500).json({ error: 'Server error while updating listing' });
  }
});

// Get all GPU listings and populate the user's email
router.get('/', async (req, res) => {
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
