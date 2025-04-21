const GpuCard = ({ gpu }) => {
  // Construct base64 image source if imageData exists
  const imageSrc =
    gpu.imageData && gpu.imageType
      ? `data:${gpu.imageType};base64,${gpu.imageData}`
      : null;

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{gpu.gpuName}</h2>
      <p className="text-gray-700 mb-1"><strong>Price:</strong> ${gpu.sellerPrice}</p>
      <p className="text-gray-700 mb-1"><strong>Condition:</strong> {gpu.condition}</p>
      <p className="text-gray-700 mb-1"><strong>Category:</strong> {gpu.category}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {gpu.description}</p>
      
      {imageSrc && (
        <img
          src={imageSrc}
          alt={gpu.gpuName}
          className="w-full h-48 object-cover rounded"
        />
      )}
    </div>
  );
};

export default GpuCard;
