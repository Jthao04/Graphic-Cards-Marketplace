import React, { useState } from "react";

const mockListings = [
  {
    id: 1,
    title: "GeForce RTX 3080",
    price: 699,
    image: "gpu-placeholder.jpg",
  },
  {
    id: 2,
    title: "AMD Radeon RX 6800",
    price: 549,
    image: "gpu-placeholder.jpg",
  },
];

const Dashboard = () => {
  const [myListings, setMyListings] = useState(mockListings);

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this listing?");
    if (confirm) {
      setMyListings((prev) => prev.filter((listing) => listing.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {myListings.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((gpu) => (
            <div
              key={gpu.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={gpu.image}
                alt={gpu.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{gpu.title}</h2>
                <p className="text-gray-700">${gpu.price}</p>
                <div className="flex justify-end gap-4 mt-4 text-sm">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleDelete(gpu.id)}
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