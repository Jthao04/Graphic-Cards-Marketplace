import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white text-center py-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Featured GPUs Placeholder */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="gpu-image-placeholder.jpg" alt="GPU" className="h-48 w-full object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">NVIDIA GeForce RTX 3080</h3>
            <p className="text-gray-700 mb-4">Price: $799</p>
            <Link to="/listings/1">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                View Details
              </button>
            </Link>
          </div>

          {/* Repeat above block for other GPUs */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="gpu-image-placeholder.jpg" alt="GPU" className="h-48 w-full object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">AMD Radeon RX 6800</h3>
            <p className="text-gray-700 mb-4">Price: $649</p>
            <Link to="/listings/2">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                View Details
              </button>
            </Link>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-4">
            <img src="gpu-image-placeholder.jpg" alt="GPU" className="h-48 w-full object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">MSI GeForce GTX 1660 Ti</h3>
            <p className="text-gray-700 mb-4">Price: $249</p>
            <Link to="/listings/3">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;