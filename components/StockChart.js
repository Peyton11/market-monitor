import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/getData')
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array of objects with the expected structure
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Stock Price',
      data: data.map(item => item.close),
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }],
  };

  return (
    <div>
      <h2>Stock Price Chart</h2>
      { data.length ? <Line data={chartData} /> : <p>Loading data...</p> }
    </div>
  );
};

export default StockChart;

