import React from 'react'
import InfographicsForm from '../components/InfographicsForm'
import { Container } from '@mui/material'
import PriceTrendChart from '../components/charts/PriceTrendChart'


export default function Infographics() {
  const historicalData = [
    { date: '2023-01-01', price: 100 },
    { date: '2023-02-01', price: 110 },
    { date: '2023-03-01', price: 105 },
  ];

  const predictedData = [
    { date: '2023-04-01', price: 115 },
    { date: '2023-05-01', price: 120 },
  ];

	return (
		<Container>
			<InfographicsForm />
      <PriceTrendChart historicalData={historicalData} predictedData={predictedData} />
		</Container>
	)	
}
