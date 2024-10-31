import React from 'react';
import Plot from 'react-plotly.js';

export default function LandsizeChart({prices, landsizes}) {
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
					text:'Predicted Prices of Houses in Postcode subrub baseed on landsize',
					// text:'Prediction of House Prices based on Landsize',
				}, 

				xaxis: {
					// dtick: 1,
					title: {
						text:'Landsize'
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