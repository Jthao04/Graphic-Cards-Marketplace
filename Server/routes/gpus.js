import express from 'express';
import multer from 'multer';
import GpuListing from '../models/GpuListing.js';

const router = express.Router();

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


    const newListing = new GpuListing({
      gpuName,
      description,
      category,
      condition,
      sellerPrice,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      // Replace with real user ID once auth is done
      userId: 'placeholder-user-id' 
    });

    await newListing.save();
    res.status(201).json({ message: 'GPU listed successfully', listing: newListing });
  } catch (err) {
    console.error('Error saving listing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
