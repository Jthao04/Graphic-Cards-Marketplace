import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const GpuPriceChecker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [gpuName, setGpuName] = useState('');
  const [sellerPrice, setSellerPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nvidia');
  const [gpuCondition, setGpuCondition] = useState('New');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGpuName(value);
    setPrice(null);
    setLoading(false);
    setHasSearched(false);
    setCountdown(null);

    if (timeoutId) clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);

    if (value.length >= 3) {
      let seconds = 4;
      setCountdown(seconds);

      const newInterval = setInterval(() => {
        seconds -= 1;
        setCountdown(seconds);
        if (seconds === 0) clearInterval(newInterval);
      }, 1000);
      setIntervalId(newInterval);

      const newTimeout = setTimeout(() => {
        setLoading(true);
        fetch(`${apiUrl}/api/price?query=${encodeURIComponent(value)}`)
          .then(res => res.json())
          .then(data => {
            setHasSearched(true);
            setPrice(data.averagePrice || null);
          })
          .catch(() => {
            setHasSearched(true);
            setPrice(null);
          })
          .finally(() => {
            setLoading(false);
            setCountdown(null);
          });
      }, 4000);

      setTimeoutId(newTimeout);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a listing.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('gpuName', gpuName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('condition', gpuCondition);
    formData.append('sellerPrice', sellerPrice);
    formData.append('userId', user._id);

    if (imageBase64) {
      formData.append('imageData', imageBase64);
      formData.append('imageType', image.type);
    }

    try {
      const res = await fetch(`${apiUrl}/api/gpus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert('GPU listing submitted successfully!');
        setGpuName('');
        setSellerPrice('');
        setDescription('');
        setCategory('Nvidia');
        setGpuCondition('New');
        setImage(null);
        setImageBase64('');
        setHasSearched(false);
      } else {
        const data = await res.json();
        alert(`Submission failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('An error occurred while submitting the listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Post a GPU for Sale</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Graphics Card Name</label>
          <input
            type="text"
            value={gpuName}
            onChange={handleInputChange}
            placeholder="e.g., RTX 4070 Ti"
            required
            className="uniform-input mt-1"
          />
        </div>

        {countdown !== null && countdown > 0 && (
          <div className="text-sm text-gray-500">Checking Amazon in {countdown}...</div>
        )}
        {loading && <div className="text-sm text-gray-500">Checking Amazon...</div>}
        {price && <div className="text-sm text-green-600">Estimated Amazon Price: ${price}</div>}
        {hasSearched && !loading && !price && (
          <div className="text-sm text-red-600">No price found.</div>
        )}

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="uniform-input mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Category (Chipset)</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="uniform-input mt-1"
          >
            <option value="Nvidia">Nvidia</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Condition</label>
          <select
            value={gpuCondition}
            onChange={(e) => setGpuCondition(e.target.value)}
            className="uniform-input mt-1"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Seller Price ($)</label>
          <input
            type="number"
            value={sellerPrice}
            onChange={(e) => setSellerPrice(e.target.value)}
            required
            className="uniform-input mt-1"
          />
        </div>

        {/* Optional image upload (disabled for now) */}
        {/* 
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>
        */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default GpuPriceChecker;