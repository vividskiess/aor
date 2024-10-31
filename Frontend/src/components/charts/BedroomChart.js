import React from 'react';
import Plot from 'react-plotly.js';

export default function BedroomChart({prices, bedrooms}) {
	return (
		<Plot
			data={[
				{
					x: bedrooms,
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
						text:'Bedrooms'
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
