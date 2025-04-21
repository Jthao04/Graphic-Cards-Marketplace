import React from 'react';
import { Link } from 'react-router-dom';

const GpuCard = ({ gpu }) => {
  // Define a map for category images
  const categoryImages = {
    Nvidia: '/assets/NvidiaGpuImg.jpeg',
    AMD: '/assets/AMDGpuImg.jpg',
    Intel: '/assets/IntelGpuImg.jpg',
  };

  // Select the appropriate image based on the category
  const imageSrc = categoryImages[gpu.category] || '/assets/defaultGpuImg.jpg';

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{gpu.gpuName}</h2>
      <p className="text-gray-700 mb-1"><strong>Price:</strong> ${gpu.sellerPrice}</p>
      <p className="text-gray-700 mb-1"><strong>Condition:</strong> {gpu.condition}</p>
      <p className="text-gray-700 mb-1"><strong>Category:</strong> {gpu.category}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {gpu.description}</p>

      <img
        src={imageSrc}
        alt={`${gpu.category} GPU`}
        className="w-full h-48 object-cover rounded mb-4"
      />

      {gpu.userId && gpu.userId.email && (
        <p className="text-gray-600 mt-2"><strong>Seller Email:</strong> {gpu.userId.email}</p>
      )}
      <Link to={`/listings/${gpu._id}`}>
  <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
    View Details
  </button>
</Link>
    </div>
  );
};

export default GpuCard;
