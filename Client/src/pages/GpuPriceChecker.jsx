import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const GpuPriceChecker = () => {
  const { user } = useAuth();

  const [gpuName, setGpuName] = useState('');
  const [sellerPrice, setSellerPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nvidia');
  const [gpuCondition, setGpuCondition] = useState('New');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Convert image file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.warn('No file selected.');
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Get base64 string
      if (base64String) {
        setImageBase64(base64String);
      } else {
        console.error('Failed to convert image to base64.');
      }
    };
    reader.onerror = () => {
      console.error('Error reading file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to post a listing.');
      return;
    }

    if (!gpuName || !description || !category || !gpuCondition || !sellerPrice) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('gpuName', gpuName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('condition', gpuCondition);
    formData.append('sellerPrice', sellerPrice);

    if (imageBase64) {
      formData.append('imageData', imageBase64); // Send base64 image
      formData.append('imageType', image?.type || ''); // Send MIME type
    }

    try {
      const res = await fetch(`${apiUrl}/api/gpus`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
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
      } else {
        const data = await res.json();
        console.error('Backend error:', data);
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
    <div>
      <h3>Post a GPU for Sale</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Graphics Card Name:</label>
          <input
            type="text"
            value={gpuName}
            onChange={(e) => setGpuName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
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
          <select
            value={gpuCondition}
            onChange={(e) => setGpuCondition(e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div>
          <label>Seller Price ($):</label>
          <input
            type="number"
            value={sellerPrice}
            onChange={(e) => setSellerPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default GpuPriceChecker;