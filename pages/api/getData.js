import StockData from '../../models/StockData';
import { connect } from '../../lib/mongodb';

export default async function handler(req, res) {
  await connect();

  try {
    const stockData = await StockData.find({});
    res.status(200).json(stockData);
  } catch (error) {
    console.error('Error querying data:', error);
    res.status(500).json({ error: 'Failed to query data' });
  }
}
