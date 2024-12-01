import Head from 'next/head';
import { useEffect, useState } from 'react';
import StockChart from '../components/StockChart';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API when the page loads
    fetch('/api/fetchData')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched and stored:', data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Stock Data Visualization</title>
      </Head>
      <main>
        <h1>Welcome to Stock Data Visualization</h1>
        {loading ? <p>Loading data...</p> : <StockChart />}
      </main>
    </div>
  );
}
