import axios from 'axios';
import StockData from '../../models/StockData';
import { connect } from '../../lib/mongodb';

export default async function handler(req, res) {
  await connect();

  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;
    const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=${apiKey}`);

    // Log the response to verify its structure
    console.log('API Response:', response.data);

    const data = response.data.values;

    await StockData.insertMany(data.map(item => ({
      symbol: 'AAPL',
      date: item.datetime,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
    })));

    res.status(200).json({ message: 'Data fetched and stored successfully' });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
