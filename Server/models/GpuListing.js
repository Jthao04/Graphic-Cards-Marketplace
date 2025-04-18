import mongoose from 'mongoose';

const GpuListingSchema = new mongoose.Schema({
  gpuName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Nvidia', 'AMD', 'Intel'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  sellerPrice: { type: Number, required: true },
  // Store a path or link for now
  imageUrl: { type: String }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model('GpuListing', GpuListingSchema);
