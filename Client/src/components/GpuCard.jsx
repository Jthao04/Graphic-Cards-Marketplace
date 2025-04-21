import React from 'react';

const GpuCard = ({ gpu }) => {
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
        className="w-full h-48 object-cover rounded"
      />
    </div>
  );
};

export default GpuCard;
