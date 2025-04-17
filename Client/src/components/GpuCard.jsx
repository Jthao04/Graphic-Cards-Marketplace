import React from "react";
import { Link } from "react-router-dom";

const GpuCard = ({ gpu }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={gpu.image || "gpu-placeholder.jpg"}
        alt={gpu.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{gpu.title}</h2>
        <p className="text-gray-700 mb-2">${gpu.price}</p>
        <Link
          to={`/listings/${gpu.id}`}
          className="text-indigo-600 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GpuCard;