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
					marker: {
						color: 'rgba(18,85,255,1)',
					}
				}
			]}

			layout = {{
				title: {
					text:`Predicted Prices of Houses, Based on Land Size`,
				}, 

				xaxis: {
					dtick: 100,
					title: {
						text:'Land Size'
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