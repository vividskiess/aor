import React from 'react'
import InfographicsForm from '../components/InfographicsForm'
import { Container } from '@mui/material'
import Plot from 'react-plotly.js';
import PriceTrendChart from '../components/PriceTrendChart'

export default function Infographics() {
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
	return (
		<Container>
			<InfographicsForm />
			{/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      /> */}
      <PriceTrendChart historicalData={historicalData} predictedData={predictedData} />

		</Container>
	)	
}
