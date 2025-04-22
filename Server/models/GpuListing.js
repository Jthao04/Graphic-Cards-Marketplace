import mongoose from 'mongoose';

const GpuListingSchema = new mongoose.Schema({
  gpuName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Nvidia', 'AMD', 'Intel'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  sellerPrice: { type: Number, required: true },
  imageData: { type: String }, // Base64 encoded image
  imageType: { type: String }, // MIME type of the image (e.g., image/png)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Add an index for performance
GpuListingSchema.index({ userId: 1 });

export default mongoose.model('GpuListing', GpuListingSchema);