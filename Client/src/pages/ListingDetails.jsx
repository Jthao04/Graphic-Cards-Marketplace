import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams(); // Get the GPU listing ID from the URL
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Replace this with your actual backend call
        const response = await fetch(`/api/listings/${id}`);
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Failed to load listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="p-6">Loading listing...</div>;

  if (!listing) return <div className="p-6">Listing not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={listing.image || "/gpu-placeholder.jpg"}
        alt={listing.gpuName}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{listing.gpuName}</h1>

      <div className="text-lg text-gray-700 space-y-2">
        <p><strong>Chipset:</strong> {listing.chipset}</p>
        <p><strong>Manufacturer:</strong> {listing.manufacturer}</p>
      </div>

      {/* Optional: Add more info below later */}
    </div>
  );
};

export default ListingDetails;