import React from 'react'
import InfographicsForm from '../components/InfographicsForm'
import { Container } from '@mui/material'
import Plot from 'react-plotly.js';

export default function Infographics() {
	return (
		<Container>
			<InfographicsForm />
			<Plot
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
      />
		</Container>
	)	
}
