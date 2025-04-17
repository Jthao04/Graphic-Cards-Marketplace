import mongoose from 'mongoose';

const GpuListingSchema = new mongoose.Schema({
  gpuName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Nvidia', 'AMD', 'Intel'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true, },
  sellerPrice: { type: Number, required: true },
  // Store a path or link for now
  imageUrl: { type: String }, 
  // Placeholder until login is set up
  userId: { type: String },
}, {
  timestamps: true
});

export default mongoose.model('GpuListing', GpuListingSchema);
