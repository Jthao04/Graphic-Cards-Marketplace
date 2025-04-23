import React from 'react';

const GpuCard = ({ gpu, imageClass = "w-full h-48 object-cover rounded mb-4" }) => {
  const categoryImages = {
    Nvidia: '/assets/NvidiaGpuImg.jpeg',
    AMD: '/assets/AMDGpuImg.jpg',
    Intel: '/assets/IntelGpuImg.jpg',
  };

  const imageSrc = categoryImages[gpu.category] || '/assets/defaultGpuImg.jpg';

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={imageSrc}
        alt={`${gpu.category} GPU`}
        className={`${imageClass} w-64 h-64 object-cover`} // Fixed width and height
      />
      <h2 className="text-xl font-semibold mb-2">{gpu.gpuName}</h2>
      <p className="text-gray-700 mb-1"><strong>Price:</strong> ${gpu.sellerPrice}</p>
      <p className="text-gray-700 mb-1"><strong>Condition:</strong> {gpu.condition}</p>
      <p className="text-gray-700 mb-1"><strong>Category:</strong> {gpu.category}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {gpu.description}</p>
      {gpu.userId && gpu.userId.email && (
        <p className="text-gray-600 mt-2"><strong>Seller Email:</strong> {gpu.userId.email}</p>
      )}
    </div>
  );
};

export default GpuCard;