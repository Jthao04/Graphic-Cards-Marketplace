import React, { useEffect, useState } from "react";
import GpuCard from "../components/GpuCard";

const apiUrl = import.meta.env.VITE_API_URL;

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/gpus`);
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div className="p-6">Loading listings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Graphics Card Listings</h1>

      {listings.length === 0 ? (
        <p className="text-gray-600">No listings available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((gpu) => (
            <GpuCard key={gpu._id} gpu={gpu} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
