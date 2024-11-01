import { TextField, Button, Container, Stack, Typography, Box } from '@mui/material';
import YearBuiltChart from '../components/charts/YearBuiltChart';
import LandsizeChart from '../components/charts/LandsizeChart';
import BedroomChart from '../components/charts/BedroomChart'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Infographics() {
	const [postcode, setPostcode] = useState(3000)

	const [rooms] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	const [roomsPrices, setRoomsPrices] = useState([]);

	const [landsizes] = useState([100, 200, 300, 400, 500, 600, 700, 800, 900])
	const [landsizePrices, setLandsizePrices] = useState([]);

	const [yearBuilt, setYearBuilt] = useState([])
	const [yearBuiltCluster, setYearBuiltCluster] = useState([])

	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('false')


	// This function fetches the data required for the <BedroomChart> graph
	const fetchRoomsData = async () => {
		setRoomsPrices([])

		// Takes each room number gets the predicted price for a house with those rooms
		rooms.map(async (bedroom) => {
			try {
				// Receives the response from the API using the current room and inputted postcode.
				const response = await axios.post(`http://127.0.0.1:8000/Infographics/Bedroom`, {
					postcode: postcode,
					bedroom: bedroom
				});

				// The price of the current room is pushed onto the 'roomsPrice' array
				setRoomsPrices(prevPrices => [...prevPrices || [], response.data.price])
			} 
			
			catch (error) {
				// Sends the error messages to the console and front-end 
				setError(true)
				setErrorMessage("Failed to fetch data. Postcode does not exist in our data or you have entered an invalid Postcode.")
				console.error("Error encountered while fetching bedroom prices: ", error);
			}
		})
	}

	// This function fetches the data required for the <LandsizeChart> graph
	const fetchLandsizeData = async () => {
		setLandsizePrices([])

		// Takes each landsize gets the predicted price for a house with those the size of the landsize
		landsizes.map(async (landsize) => {
			try {
				const response = await axios.post(`http://127.0.0.1:8000/Infographics/Landsize`, {
					postcode: postcode,
					landsize: landsize
				});

				// The price of the current landsize is pushed onto the 'landsizePrices' array
				setLandsizePrices((prevPrices) => [...prevPrices, response.data.price]);
			} 
			
			catch (error) {
				// Sends the error messages to the console and front-end 
				setError(true)
				setErrorMessage("Failed to fetch data. Postcode does not exist in our data or you have entered an invalid Postcode.")
				console.error("Error encountered while fetching landsize prices: ", error);
			}
		})
	}

	// This function fetches the data required for the <YearBuiltChart> graph
	const fetchYearBuiltData = async () => {
		setYearBuilt([])
		setYearBuiltCluster([])

		try {
			// Gets the clusters and the house build year from the API
			const response = await axios.get(`http://127.0.0.1:8000/Infographics/YearBuilt/${postcode}`)

			// Sets the variables to hold the house build year and the clusters.
			setYearBuilt([...response.data.year_built])
			setYearBuiltCluster([...response.data.clusters])
		}

		catch (error) {
				// Sends the error messages to the console and front-end 
				setError(true)
				setErrorMessage("Failed to fetch data. Postcode does not exist in our data or you have entered an invalid Postcode.")
				console.error("Error encountered while fetching landsize prices: ", error);
		}
	}

	// Fetches all of the data for the graphs, for when the page begins.
	useEffect(() => {
		fetchRoomsData()
		fetchLandsizeData()
		fetchYearBuiltData()
	}, []);
	
	// Fetches all of the data for the graphs, when the user presses the submit button.
	const handleSubmit = async () => {
		setError(false)
		fetchRoomsData()
		fetchLandsizeData()
		fetchYearBuiltData()
	}

	return (
		<Container disableGutters sx={{ p: 5 }}>
			<h2>Predict prices of houses in your chosen suburb</h2>

			<Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
				<TextField
					type="text"
					variant='outlined'
					color='secondary'
					label="Postcode"
					pattern="[0-9]*"
					onChange={e => setPostcode(e.target.value)}
					value={postcode}
					fullWidth
					required
				/>
				
				<Button variant="outlined" color="secondary" onClick={handleSubmit}>Submit</Button>
			</Stack>

			{		
				error == false ?
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						border: 1,
						borderColor: 'rgba(223, 223, 223, 1)',
						px: 2,
						py: 2,
						borderRadius: '34px',
					}}
				>
					<BedroomChart prices={roomsPrices} bedrooms={rooms}/>
					<LandsizeChart prices={landsizePrices} landsizes={landsizes}/>
					<YearBuiltChart yearBuilt={yearBuilt} clusters={yearBuiltCluster}/>
				</Box>
				:
				<Box>
					<Typography color='error'> {errorMessage} </Typography>
				</Box>
			}

		</Container>
	)
}
