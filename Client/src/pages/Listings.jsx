import React, { useEffect, useState } from "react";
import GpuCard from "../components/GpuCard";
const apiUrl = import.meta.env.VITE_API_URL;

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let url = `${apiUrl}/api/gpus?`;

        if (categoryFilter) {
          url += `category=${categoryFilter}&`;
        }
        if (conditionFilter) {
          url += `condition=${conditionFilter}&`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [categoryFilter, conditionFilter]);

  if (loading) return <div className="p-6">Loading listings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Graphics Card Listings</h1>

      {/* Sorting Filters */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Nvidia">Nvidia</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Condition</label>
          <select
            className="w-full p-2 border rounded"
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
      </div>

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
