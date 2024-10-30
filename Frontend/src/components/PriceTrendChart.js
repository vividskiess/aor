import React from 'react';
import Plot from 'react-plotly.js';

const PriceTrendChart = ({ historicalData, predictedData }) => {
  // Assume historicalData and predictedData are arrays of objects with { date, price }
  const historicalDates = historicalData.map(data => data.date);
  const historicalPrices = historicalData.map(data => data.price);
  const predictedDates = predictedData.map(data => data.date);
  const predictedPrices = predictedData.map(data => data.price);

  return (
    <div>
      <h2>Price Trends and Predictions</h2>
      <Plot
        data={[
          {
            x: historicalDates,
            y: historicalPrices,
            mode: 'lines+markers',
            name: 'Historical Prices',
            line: { color: 'blue' },
          },
          {
            x: predictedDates,
            y: predictedPrices,
            mode: 'lines+markers',
            name: 'Predicted Future Prices',
            line: { color: 'orange' },
          },
        ]}
        layout={{
          title: 'Historical Prices vs Predicted Future Prices',
          xaxis: { title: 'Date' },
          yaxis: { title: 'Price' },
          legend: { orientation: 'h' },
        }}
      />
    </div>
  );
};

// Sample usage
const historicalData = [
  { date: '2023-01-01', price: 100 },
  { date: '2023-02-01', price: 110 },
  { date: '2023-03-01', price: 105 },
  // ... more historical data
];

const predictedData = [
  { date: '2023-04-01', price: 115 },
  { date: '2023-05-01', price: 120 },
  // ... more predicted data
];

const App = () => {
  return (
    <div>
      <PriceTrendChart historicalData={historicalData} predictedData={predictedData} />
    </div>
  );
};

export default App;
