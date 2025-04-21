import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext for user authentication

const Dashboard = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await fetch("/api/listings/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        setMyListings(data); // Update state with the user's listings
      } catch (error) {
        console.error("Error fetching user listings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyListings();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this listing?");
    if (confirm) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/listings/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete listing");
        }

        setMyListings((prev) => prev.filter((listing) => listing._id !== id));
        alert("Listing deleted successfully!");
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("Failed to delete listing.");
      }
    }
  };

  if (loading) {
    return <div className="p-6">Loading your listings...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {myListings.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((gpu) => (
            <div
              key={gpu._id} // Use MongoDB's _id as the key
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={gpu.image || "gpu-placeholder.jpg"} // Fallback image if none is provided
                alt={gpu.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{gpu.title}</h2>
                <p className="text-gray-700">${gpu.price}</p>
                <div className="flex justify-end gap-4 mt-4 text-sm">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(gpu._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;