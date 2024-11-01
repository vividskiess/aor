import React from 'react';
import Plot from 'react-plotly.js';

export default function YearBuiltChart({yearBuilt, clusters}) {
  return (
    <Plot
      data={[
        {
          x: yearBuilt,
          y: clusters,
          type: 'scatter',
          mode: 'markers',
          marker: {
              size: 15,
              color: clusters,
              colorscale: 'Blues',
              colorbar: {
                  title: 'Clusters of Houses Built',
                  titleside: 'right'
              }
          },
        },
      ]}

      layout = {{
        title: {
          text: 'Build Year of Houses Within the Postcode, Grouped in Clusters',
        }, 

        xaxis: {
          title: {
            text: 'Year Built'
          }, 
        },

        yaxis: {
          title: {
            text:'Cluster'
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
