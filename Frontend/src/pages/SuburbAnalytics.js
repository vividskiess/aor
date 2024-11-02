import React, { useState, useEffect } from 'react'
import { Typography, Box, Paper, IconButton, InputBase, Button, Container } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import suburbBirdEye from '../assets/suburbBirdsEye.jpg'
import infographicsBanner from '../assets/InfographicsBanner.png'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import chartPlaceholder from '../assets/chartPlaceholder.png'
import RoomsVSPricesChart from '../components/charts/RoomVSPricesChart'
import axios from 'axios'

export default function SuburbAnalytics() {

	// holds data returned from API call
	const [suburbData, setSuburbData] = useState(null);


	const [roomsVSPrices, setRoomsVSPrices] = useState({ rooms: [], prices: [] });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [searchTerm, setSearchTerm] = useState(3000);

	// holds an array of objects that are used for rendering each market insight entry point
	const marketInsights = suburbData ? [
		{ metric: 'Average Price:', val: `$${Math.round(suburbData.avg_price).toLocaleString('en')}` || null },
		{ metric: 'Max Price:', val: `$${Math.round(suburbData.max_price).toLocaleString('en')}` || null },
		{ metric: 'Average Landsize:', val: `${Math.round(suburbData.avg_land_size)}sqm` || null },
		{ metric: 'Max Landsize:', val: `${Math.round(suburbData.max_land_size)}sqm` || null },
		{ metric: 'Schools:', val: suburbData.school_count || null },
	] : [];

	useEffect(() => {
		// Fetch data for the default postcode 3000 on mount
		fetchSuburbData(3000);
	}, []);

	// API request that returns two different data points
	// analytics: contains data related with the suburb
	// roomsvsprices: contains rooms and price of each property with the given postcode
	const fetchSuburbData = async (postcode) => {
		setLoading(true)
		setError('')
		try {
			const response = await axios.get(`http://localhost:8000/SuburbAnalytics/${postcode}`)
			console.log(response.data)
			setSuburbData(response.data.analytics)
			setRoomsVSPrices(response.data.rooms_vs_prices)
		} catch (err) {
			setError('Failed to fetch data. Postcode does not exist in our data or you have entered an invalid Postcode. ');
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		if (searchTerm) {
			fetchSuburbData(searchTerm)
		}
	}

	const handleInputChange = (e) => {
		if(!isNaN(e)) {
			if(e.length <= 4)
			setSearchTerm(e);
	}
	}



	return (
		<Container 
			disableGutters 
			sx={{ 
				display: 'flex', 
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start', 
				m: 0, 
				pt: { xs: 1, sm: 1, md: 3.5, lg: 3.5 },
				px: { xs: 1, sm: 1, md: 3.5, lg: 3.5 },
				minWidth: '100%', 
			}}
		>
			<img style={{ maxWidth: '100%', height: 'auto', padding: 0, margin: 0, objectFit: 'contain'}} src={infographicsBanner} alt="infographics banner" />
			<Box 
				sx={{
					display: 'flex',
					justifyContent: 'center',
					py: { xs: 1, sm: 2, md: 6, lg: 8 }, 
					px: { xs: 1, md: 10, lg: 20 },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
						alignItems: 'center',
						justifyContent: 'center',
						gap: 5,
						backgroundColor: 'rgba(223, 223, 223, 1)',
						px: { xs: 1, sm: 2, md: 6, lg: 6 },
						py: { xs: 1, sm: 2, md: 10, lg: 10 },
						borderRadius: '34px',
						width: 'auto',
						maxHeight: 'auto'
					}}
				>
					<Box 
						sx={{ 
							display: 'flex', 
							flexDirection: 'column',
							justifyContent: 'center',
							alignContent: 'center',
							width: { xs: '80%', sm: '80%', md:'450px', lg: '450px' },
							gap: 2
						}}
					>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 18, md: 36 },
								letterSpacing: -1.2
							}}
						>
							Find your place, on your own terms
						</Typography>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 14, sm: 16 },
								letterSpacing: -1
							}}
						>
							Find your ideal suburb with our search tool, designed to help you explore areas that match your lifestyle. From local amenities to property trends, get all the insights you need to make informed decisions and invest in the perfect location for your dream home!
						</Typography>
						<Box 
							sx={{ 
								display: 'flex', 
								flexDirection: 'column',
								gap: 2, 
								maxWidth: { xs: '100%', sm: '100%', md: '450px', lg: '450x' }
								}}
						>
							<Paper
								component="form"
								sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
							>
							{/* input that handles postcode */}
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder="Enter Postcode"
									inputProps={{ 'aria-label': 'search suburbs' }}
									value={searchTerm}
									onChange={(e) => handleInputChange(e.target.value)}
								/>
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
									<SearchIcon />
								</IconButton>
							</Paper>
							{/* when clicked it will call fetchSuburbData() for the API request */}
							<Button 
								sx={{ 
									borderRadius: '10px', 
									backgroundColor: '#1255FF', 
									textTransform: 'none',
									py: 1.5
								}} 
								variant="contained"
								onClick={handleSearch}
							>
								Search Suburb Profile
							</Button>
						</Box>
					</Box>
					<Box>
						<img style={{ maxWidth: '100%', height: 'auto', padding: 0, margin: 0, borderRadius: '16px' }} src={suburbBirdEye} alt="suburb birds eye view" />
					</Box>
				</Box>
			</Box>
			{loading && <Typography>Loading...</Typography>}
			{error && <Typography color="error">{error}</Typography>}

			<Box sx={{ width: '100%', px: { xs: 1, sm: 0, md: 10, lg: 20 }, pb: 2, pt: 2 }}>
				<Box 
					sx={{
						borderRadius: '20px',
						color: 'white',
						background: 'linear-gradient(0deg, rgba(0,0,0,1) 45%, rgba(2,26,86,1) 100%)',
					}}	
				>
					<Box 
						sx={{ 
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							py: 2, 
							px: 5,
							borderBottom: '2px solid white',
						}}
					>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 22, md: 36 },
								letterSpacing: -1.2
							}}
						>
							{suburbData ? suburbData.suburb : 'N/A'}
						</Typography>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 12, md: 16 },
								letterSpacing: -1
							}}
						>
							{suburbData ? `Melbourne - ${suburbData.region_name}, VIC, ${suburbData.postcode}` : 'N/A'}
						</Typography>
					</Box>
					<Box
						sx={{ 
							display: 'flex',
							flexDirection: 'column',
							py: 2, 
							px: 5,
							borderBottom: '2px solid white',
						}}
					>
					<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								color: 'inherit',
								textDecoration: 'none',
								fontSize: 16,
								letterSpacing: -1
							}}
						>
							Median Price
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography
								variant="body"
								sx={{
									fontFamily: 'monospace',
									color: 'inherit',
									textDecoration: 'none',
									fontSize: 16,
									letterSpacing: -1
								}}
							>
								{suburbData ? `$${suburbData.median_price.toLocaleString('en')}` : 'N/A'}
							</Typography>
							<InfoOutlinedIcon />
						</Box>
						<Box 
							sx={{ 
								py: 1,
								display: 'flex',
								justifyContent: { xs: 'center', md: 'flex-start' },
								alignItems: 'center'
							}}
						>
							{roomsVSPrices.rooms.length > 0 && roomsVSPrices.prices.length > 0 ? (
								<RoomsVSPricesChart rooms={roomsVSPrices.rooms} prices={roomsVSPrices.prices} />
                ) : ( 
									<img style={{ maxWidth: '100%', height: 'auto', padding: 0, margin: 0 }} src={chartPlaceholder} alt="chart" />
									)
							}
							
						</Box>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 15, md: 20 },
								letterSpacing: -0.8
							}}
						>
							Market Insights for {suburbData ? `${suburbData.suburb}` : 'properties'}
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 1.5, pb: 2 }}>
						{ marketInsights.map((item, i) => {
							return (
								<Box 
									key={i}
									sx={{ 
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										background: 'white', 
										color: 'black', 
										py: 1, 
										px: { xs: 0, md: 2 }, 
										borderRadius: '5px',
										fontWeight: 'bold',
										fontSize: { xs: 14, md: 20 }
									}}
								>
									{ item.metric } {item.val}
								</Box>
							)
						})}
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
	)	
}
