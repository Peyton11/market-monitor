import mongoose from 'mongoose';

const StockDataSchema = new mongoose.Schema({
  symbol: String,
  date: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
});

export default mongoose.models.StockData || mongoose.model('StockData', StockDataSchema);

