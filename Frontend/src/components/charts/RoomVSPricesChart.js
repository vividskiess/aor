import React from 'react'
import Plot from 'react-plotly.js'

const RoomsVSPricesChart = ({ rooms, prices }) => {
	return (
		<Plot
			data={[
				{
					x: rooms,
					y: prices,
					type: 'box',
					boxpoints: 'all', // or 'outliers' for only showing outliers
					jitter: 0.3,
					pointpos: -1.8,
					name: 'Rooms vs Prices Distribution',
					marker: { color: 'blue' },

				},
			]}
			layout={{
				title: 'Rooms vs. Prices',
				xaxis: { title: 'Number of Rooms' },
				yaxis: { title: 'Prices' },
				autosize: true,
			}}
			useResizeHandler
			style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '400px' }} // maxWidth and maxHeight help with responsiveness
			/>
	)
}
export default RoomsVSPricesChart
