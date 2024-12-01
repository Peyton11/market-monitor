import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/getData')
      .then((response) => response.json())
      .then((data) => {
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
    <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Stock Price Chart: AAPL</h2>
      {data.length ? <Line data={chartData} /> : <p>Loading data...</p>}
    </div>
  );
};

export default StockChart;
