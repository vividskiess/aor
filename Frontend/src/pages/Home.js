import React, { useEffect, useState } from 'react'
import { Container, Box, Typography, Button, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import banner from "../assets/landingPageBanner.png"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import GrassIcon from '@mui/icons-material/Grass';
import smallPlaceholder from '../assets/smallPlaceholder.png'
import landingPagePhoto from '../assets/landingPagePhoto.jpg'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard';

export default function Home () {
	const [properties, setProperties] = useState([]);

	// Fetch data when component mounts
	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const response = await axios.get('http://localhost:8000/properties/random-properties');
				const propertiesWithImages =
					await Promise.all(response.data.map(async (property) => {
						try {
							console.log(response.data)
							const image = await getStreetViewImage(property.Lattitude, property.Longtitude) 
							return { ...property, image: image || smallPlaceholder } // Return property with its associated image
						} catch (error) {
							console.error("Error fetching image for property:", error)
							 // Use the placeholder image in case of an error
								return { ...property, image: smallPlaceholder }
						}
						
					}))
				setProperties(propertiesWithImages); // Assume the response returns an array of property objects
			} catch (error) {
				console.error("Error fetching properties:", error);
			}
		};
		fetchProperties();
	}, []);


	const getStreetViewImage = (lat, lng) => {
		const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY
		const STREET_VIEW_API_URL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${APIKEY}`;
		return STREET_VIEW_API_URL;
	};
	return (
		<Container disableGutters sx = {{ flexGrow: 1, m: 0, minWidth: '100%' }}>
			<Box
				sx = {{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: { xs: 'center', md: 'flex-start' },
					pt: 12,
					pb: 0.05,
					px: { sm: 5, md: 10 },
					background:`linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url(${banner})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: 'center',
					height: '800px',
					flexGrow: 1,
					color: 'white'
				}}
			>
				<Box sx = {{ width: { xs: '300px', md: '350px', lg: '650px' } }}>
				<div>
					<Typography
						variant="body"
						sx={{
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
							fontSize: { xs: 26, sm: 26, md: 36 }
						}}
					>
						Beautiful homes made for you
					</Typography>
				</div>
					<Typography variant="body">
						In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut labore et accurate disserendum et harum quidem exercitus quid.
					</Typography>
				</Box>
				<Button
					href="/Infographics"
					sx= {{ 
						borderRadius: 0,
						display: 'flex', 
						justifyContent: 'flex-start',
						alignItems: 'center',
						backgroundColor: 'white',
						height: 40,
						py: 5,
						px: 3,
						width: '100%'
					}}
				>
					<Typography
						variant="body"
						sx={{
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'black',
							textDecoration: 'none',
							fontSize: 18,
							mr: 1
						}}
					>
						View our Infographics Section
					</Typography>
					<ArrowRightAltIcon sx={{ fontSize: '2rem', fill: '#1255FF' }}/>
				</Button>
			</Box>
			<Box 
				sx= {{ 
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					px: { xs: 2, md: 8 },
					py: { xs: 2, md: 8 },
				}}	
			>
				<Box
					sx = {{ 
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: 'center',
						justifyContent: 'center',
						gap: 5,
						pb: 10
					}}
				>
					<img alt='placeholder' style={{ maxWidth: '50%', height: 'auto', paddingLe: 0, margin: 0, borderRadius: '15px', border: '1px solid rgba(0,0,0, 0.5'}} src={ landingPagePhoto }/>
					<Box 
						sx={{ 
							display: 'flex', 
							flexDirection: 'column', 
							width: { xs: '100%', md: '70%' },
							px: 2
						}} 
					>
						<Box sx={{ 
							width: '150px',
							height: '4px',
							background: 'linear-gradient(90deg, rgba(18,85,255,1) 0%, rgba(0,0,0,0.8) 100%)'
							}}
						/>
							<Typography
								variant="body"
								sx={{
									fontFamily: 'monospace',
									fontWeight: 700,
									color: 'inherit',
									textDecoration: 'none',
									fontSize: { xs: 20, md: 34 }
								}}
							>
								You're in good hands
							</Typography>
							<Typography variant='body'>
							Navigating the real estate market can be complex, but with us, you’ll feel secure every step of the way. Whether you're buying, selling, or investing, our team is dedicated to making your experience smooth, successful, and tailored to your goals. With years of experience and a deep understanding of the market, we're here to guide you confidently toward your real estate dreams.
							</Typography>
						<Button 
							href="/SuburbAnalytics"
							sx={{ 
								fontSize: '1.1rem',
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'white',
								mt: 3, 
								backgroundColor: 'black', 
								px: 4, 
								py: 1.8, 
								borderRadius: 0, 
								borderTopRightRadius: 15,
								textTransform: 'none',
								width: { xs: '100%', md: '70%' },
							}}
						>
							Suburb Analytics
							<ArrowRightAltIcon sx= {{ ml: 2, fontSize: '2.5rem', fill: '#1255FF' }}/>
						</Button>
					</Box>
				</Box>
				<Box>
					<Box sx={{ mb: 8 }}>
						<Box>
							<Box sx={{
								mb: 1, 
								width: '150px',
								height: '4px',
								background: 'linear-gradient(90deg, rgba(18,85,255,1) 0%, rgba(0,0,0,0.8) 100%)'
								}}
							/>
						</Box>
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 20, md: 34 },
							}}
						>
							View Properties Sold
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: { xs: 2, md: '20px 80px' },
						}}
					>
						{
							properties.map((item, i) => {
								return (
									<PropertyCard property={item} key={i} />
							)})
						}
					</Box>
				</Box>
			</Box>
		</Container>
	)
}
