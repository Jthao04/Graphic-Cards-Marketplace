import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const GpuPriceChecker = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize navigate for redirection

  const [gpuName, setGpuName] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const [sellerPrice, setSellerPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nvidia');
  const [gpuCondition, setGpuCondition] = useState('New');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');

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
            if (data.averagePrice) {
              setPrice(data.averagePrice);
            } else {
              setPrice(null);
            }
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

  // Convert image file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.split(',')[1]); // Get base64 string (remove the data URL prefix)
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a listing.');
      return;
    }

    const formData = new FormData();
    formData.append('gpuName', gpuName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('condition', gpuCondition);
    formData.append('sellerPrice', sellerPrice);
    formData.append('userId', user._id);
    
    if (imageBase64) {
      formData.append('imageData', imageBase64); // Send base64 image
      formData.append('imageType', image.type); // Send the MIME type
    }

    try {
      const res = await fetch(`${apiUrl}/api/gpus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        },
        body: formData,
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Error parsing server response:', text);
        alert('Invalid response from server.');
        return;
      }

      if (res.ok) {
        alert('GPU listing submitted successfully!');
        setGpuName('');
        setPrice(null);
        setDescription('');
        setCategory('Nvidia');
        setSellerPrice('');
        setImage(null);
        setImageBase64(''); 
        setHasSearched(false);
      } else {
        alert(`Submission failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('An error occurred while submitting the listing.');
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Post a GPU for Sale</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Graphics Card Name:</label>
          <br />
          <input
            type="text"
            placeholder="e.g., RTX 4070 Ti"
            value={gpuName}
            onChange={handleInputChange}
            required
          />
        </div>

        {countdown !== null && countdown > 0 && (
          <div style={{ color: 'gray' }}>Checking Amazon in {countdown}...</div>
        )}
        {loading && <div style={{ color: 'gray' }}>Checking Amazon...</div>}
        {price && <div style={{ color: 'green' }}>Estimated Amazon Price: ${price}</div>}
        {hasSearched && !loading && !price && (
          <div style={{ color: 'red' }}>No price found.</div>
        )}

        <div>
          <label>Description:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category (Chipset):</label>
          <br />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Nvidia">Nvidia</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>

        <div>
          <label>Condition:</label>
          <select value={gpuCondition} onChange={(e) => setGpuCondition(e.target.value)}>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div>
          <label>Seller Price ($):</label>
          <br />
          <input
            type="number"
            value={sellerPrice}
            onChange={(e) => setSellerPrice(e.target.value)}
            required
          />
        </div>

        {/* Not Working As Intended For Now
        <div>
          <label>Upload Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        */}
        
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GpuPriceChecker;
