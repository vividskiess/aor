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
					text:`Predicted Prices of Houses Within the Postcode, Based on Land Size`,
				}, 

				xaxis: {
					title: {
						text:'Land Size'
					}, 
				},

				yaxis: {
					dtick: 50000,
					title: {
						text:'Price'
					}
				}
			}}	

			useResizeHandler = {
				true
			}

			style = {{
				width: '100%', 
				height: '100%'
			}}
		/>
	);
}