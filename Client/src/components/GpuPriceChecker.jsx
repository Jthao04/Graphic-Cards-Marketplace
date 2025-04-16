import { useEffect, useState } from 'react';

const GpuPriceChecker = () => {
  const [gpuName, setGpuName] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGpuName(value);
    setPrice(null);
    setLoading(false);

    if (timeoutId) clearTimeout(timeoutId);

    if (value.length >= 3) {
      const newTimeout = setTimeout(() => {
        setLoading(true);
        fetch(`/api/price?query=${encodeURIComponent(value)}`)
          .then(res => res.json())
          .then(data => {
            if (data.averagePrice) {
              setPrice(data.averagePrice);
            } else {
              setPrice(null);
            }
          })
          .catch(() => setPrice(null))
          .finally(() => setLoading(false));
      }, 4000); // 4-second delay

      setTimeoutId(newTimeout);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Graphics Card Name:</label>
      <input
        type="text"
        placeholder="e.g., RTX 4070 Ti"
        value={gpuName}
        onChange={handleInputChange}
      />
      {loading && <div style={{ color: 'gray' }}>Checking Amazon...</div>}
      {price && <div style={{ color: 'green' }}>Estimated Amazon Price: ${price}</div>}
      {!loading && !price && gpuName.length >= 3 && <div style={{ color: 'red' }}>No price found.</div>}
    </div>
  );
};

export default GpuPriceChecker;
