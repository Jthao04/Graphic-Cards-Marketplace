import mongoose from 'mongoose';

const GpuListingSchema = new mongoose.Schema({
  gpuName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Nvidia', 'AMD', 'Intel'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  sellerPrice: { type: Number, required: true },

  // Store the base64 image data
  imageData: { type: String },  // base64 encoded image
  imageType: { type: String },  // type of the image (image/png, image/jpeg)
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

export default mongoose.model('GpuListing', GpuListingSchema);
