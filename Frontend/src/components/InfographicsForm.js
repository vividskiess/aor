import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Box } from '@mui/material';
import BedroomChart from '../components/charts/BedroomChart'
import axios from 'axios';

export default function InfographicsForm() {
	const [postcode, setPostcode] = useState('')
  const [bedrooms] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	const [prices, setPrices] = useState([]);

	async function handleSubmit(event) {
		event.preventDefault();
    setPrices([])

    bedrooms.map(async (room) => {
      await axios.get(`http://127.0.0.1:8000/Infographics/Bedroom/${postcode}/${room}`)
        .then((response) => {
          setPrices(prevPrices => [...prevPrices || [], response.data.price])
        })
        .catch((error) => {
          throw Error("Error encountered: ", error);
        })
    })
	}
	return (
		<Container disableGutters sx={{ p: 5 }}>
			<h2>Predict prices of houses in your chosen suburb</h2>
			<form onSubmit={handleSubmit}>
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
				</Stack>
				<Button variant="outlined" color="secondary" type="submit">Submit</Button>
			</form>
      <BedroomChart prices={prices} bedrooms={bedrooms}/>
		</Container>
	)
}