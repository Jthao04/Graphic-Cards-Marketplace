const apiUrl = import.meta.env.VITE_API_URL;

const GpuCard = ({ gpu }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">{gpu.gpuName}</h2>
      <p className="text-gray-700 mb-1"><strong>Price:</strong> ${gpu.sellerPrice}</p>
      <p className="text-gray-700 mb-1"><strong>Condition:</strong> {gpu.condition}</p>
      <p className="text-gray-700 mb-1"><strong>Category:</strong> {gpu.category}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {gpu.description}</p>
      {gpu.imageUrl && (
        <img
        src={`${import.meta.env.VITE_API_URL}${gpu.imageUrl}`}
        alt={gpu.gpuName}
        className="w-full h-48 object-cover rounded"
      />      
      )}
    </div>
  );
};

export default GpuCard;
