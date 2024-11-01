import React from 'react';
import Plot from 'react-plotly.js';

export default function BedroomChart({postcode, prices, bedrooms}) {
	return (
		<Plot
			data={[
				{
					x: bedrooms,
					y: prices,
					type: 'bar',
					mode: 'markers',
					marker: {
						color: 'rgba(18,85,255,1)',
					}
				}
			]}
			layout = {{
				title: {
					text: `Predicted Prices of Houses in ${postcode}, Based on Bedrooms`,
				}, 

				xaxis: {
					dtick: 1,
					title: {
						text: 'Amount of Bedrooms'
					}, 
				},

				yaxis: {
					title: {
						text: 'Price'
					}
				}
			}}		
		/>
	);
}
