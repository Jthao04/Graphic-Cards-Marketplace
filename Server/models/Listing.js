import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Ensure price is positive
    image: { type: String, default: 'default-image-url.jpg' }, // Default image
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Add an index for performance
listingSchema.index({ user: 1 });

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;