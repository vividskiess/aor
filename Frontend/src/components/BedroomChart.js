import axios from 'axios';
import React from 'react';
import Plot from 'react-plotly.js';

export default class BedroomChart extends React.Component {
	state = {
		x: [1, 5, 4, 6, 11, 5, 5, 11, 3, 7, 8], // Bedroom
		y: [5, 7, 4, 2, 11, 4, 6, 7, 8, 11, 2], // Price
	}
		
	componentDidMount() {
		// TEST CODE CHANGE
		axios.get('http://127.0.0.1:8000/SuburbAnalytics/3084')
		  	.then(response => {
				console.log(response.data)
			}
		)
	}

	render() {	
		return (
			<Plot
				data={[
					{
						x: this.state.x,
						y: this.state.y,
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
						dtick: 1,
						title: {
							text:'Price'
						}
					}
				}}		
			/>
		);
	}
}
