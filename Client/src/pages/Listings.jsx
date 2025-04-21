import React, { useEffect, useState } from "react";
import GpuCard from "../components/GpuCard"; // You'll make this next!

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        // Get the token from localStorage or your auth system
        const token = localStorage.getItem("token"); // Ensure the token is stored securely

        const response = await fetch("/api/listings/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user listings");
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, []);

  if (loading) return <div className="p-6">Loading listings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Graphics Card Listings</h1>

      {listings.length === 0 ? (
        <p className="text-gray-600">You have no listings available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((gpu) => (
            <GpuCard key={gpu._id} gpu={gpu} /> /* Use _id since MongoDB uses it */
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;