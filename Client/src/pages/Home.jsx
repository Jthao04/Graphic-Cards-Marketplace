import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GpuCard from '../components/GpuCard.jsx'



const Home = () => {

  const [listings, setListings] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/gpus`);
        const data = await response.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      }
    };

    fetchListings();
  }, []);


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-black text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to GPU Marketplace!</h1>
        <p className="text-xl mb-8">Find the best graphics cards for your gaming or work setup.</p>
        <Link to="/listings">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg">
            Browse Listings
          </button>
        </Link>
      </section>

      {/* Featured Listings */}
      <section className="px-6 py-12">
  <h2 className="text-3xl font-bold text-center mb-8">Featured Graphics Cards</h2>

  {listings.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">
      🚫 No listings available right now. Check back soon!
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {listings.slice(0, 3).map((gpu) => (
        <GpuCard key={gpu._id} gpu={gpu} />
      ))}
    </div>
  )}
</section>
    </div>
  );
};

export default Home;