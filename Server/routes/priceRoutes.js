import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  try {
    const createJobResponse = await axios.post('https://api.priceapi.com/v2/jobs', {
      source: 'amazon',
      country: 'us',
      key: 'term',
      values: [query],
      topic: 'search_results',
      token: process.env.PRICE_API_KEY,
    });

    const jobId = createJobResponse.data.job_id;

    let jobStatus = '';
    do {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const statusResponse = await axios.get(`https://api.priceapi.com/v2/jobs/${jobId}`, {
        params: { token: process.env.PRICE_API_KEY }
      });
      jobStatus = statusResponse.data.status;
    } while (jobStatus !== 'finished');

    const resultsResponse = await axios.get(`https://api.priceapi.com/v2/jobs/${jobId}/download`, {
      params: { token: process.env.PRICE_API_KEY }
    });

    const results = resultsResponse.data.results || [];
    if (results.length === 0 || !results[0].content) {
      return res.status(404).json({ error: 'No products found for this query' });
    }

    const products = results[0].content.search_results || [];
    const prices = products
      .map(product => {
        const min = parseFloat(product.min_price);
        const max = parseFloat(product.max_price);
        return !isNaN(min) ? min : !isNaN(max) ? max : null;
      })
      .filter(price => price !== null);

    if (prices.length === 0) {
      return res.status(404).json({ error: 'No valid prices found' });
    }

    const averagePrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);

    res.json({ averagePrice });
  } catch (err) {
    console.error('PriceAPI Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

export default router;
