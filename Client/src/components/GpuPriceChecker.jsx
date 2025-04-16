import { useEffect, useState } from 'react';

const GpuPriceChecker = () => {
  const [gpuName, setGpuName] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

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
        if (seconds === 0) {
          clearInterval(newInterval);
        }
      }, 1000);
      setIntervalId(newInterval);

      const newTimeout = setTimeout(() => {
        setLoading(true);
        fetch(`/api/price?query=${encodeURIComponent(value)}`)
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

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Graphics Card Name:</label>
      <input
        type="text"
        placeholder="e.g., RTX 4070 Ti"
        value={gpuName}
        onChange={handleInputChange}
      />
      {countdown !== null && countdown > 0 && (
        <div style={{ color: 'gray' }}>Checking Amazon in {countdown}...</div>
      )}
      {loading && <div style={{ color: 'gray' }}>Checking Amazon...</div>}
      {price && <div style={{ color: 'green' }}>Estimated Amazon Price: ${price}</div>}
      {hasSearched && !loading && !price && (
        <div style={{ color: 'red' }}>No price found.</div>
      )}
    </div>
  );
};

export default GpuPriceChecker;
