import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function LandsizeChart() {
	const [landsizes] = useState([100, 200, 300, 400, 500, 600, 700, 800, 900])
	const [prices, setPrices] = useState([])
	
	// TODO: The code below is test code. Need to implement inputs for the code.
	const suburb = 3754

	// Fetches the price of the house
	useEffect(() => {
		const fetchPrices = async () => {
			try {
				// Maps over each room and fetches the predicted price for each room 
				const newPrices = await Promise.all(landsizes.map(async (room) => {
                    // TODO: Change the link.
					const response = await axios.get(`http://127.0.0.1:8000/Infographics/Bedroom/${suburb}/${room}`);
					return response.data.price;
                }));

				// Updates the state with the array of the predicted prices
				setPrices(newPrices);
			} 
			// TODO: The code below is placeholder code. Need to implement proper error checking.
			catch (error) {
				console.error("Error fetching prices:", error);
			}
		};
			fetchPrices()
    }, [landsizes]); 

	return (
		<Plot
			data={[
				{
					x: landsizes,
					y: prices,
					type: 'bar',
					mode: 'markers',
					name: 'House Price',
					marker: {
						color: 'rgba(18,85,255,1)',
					}
				}
			]}
			
			layout = {{
				title: {
					text:'Prediction of House Prices based on Bedrooms and Suburb',
				}, 

				xaxis: {
					dtick: 1,
					title: {
						text:'Land Sizes'
					}, 
				},

				yaxis: {
					title: {
						text:'Price'
					}
				}
			}}		
		/>
	);
}
