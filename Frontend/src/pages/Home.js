import React from 'react'
import { Container, Box, Typography, Button, Card, CardActionArea, CardMedia, CardContent } from '@mui/material'
import banner from "../assets/landingPageBanner.png"
import placeholder from '../assets/placeholder.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import GarageIcon from '@mui/icons-material/Garage';
import smallPlaceholder from '../assets/smallPlaceholder.png'

export default function Home () {
	const findYourNextPlaceToLive = [ 'Looking for', 'Location', 'Property Type', 'Price' ]
	const card = [
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
		{
			bedrooms: 4, 
			bathrooms: 1, 
			carSpaces: 2
		},
	]
	
	return (
		<Container disableGutters sx = {{ minWidth: '100%' }}>
			<Box
				sx = {{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					pt: 12,
					pb: 0.05,
					px: 10, 
					background:`linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url(${banner})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: 'center',
					height: '800px',
					minWidth: '100%',
					color: 'white'
				}}
			>
				<Box sx = {{ width: 300 }}>
				<div>
					<Typography
						variant="body"
						sx={{
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
							fontSize: 36
						}}
					>
						Beautiful homes made for you
					</Typography>
				</div>
					<Typography variant="body">
						In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut labore et accurate disserendum et harum quidem exercitus quid.
					</Typography>
				</Box>
				<Box 
					// add hover 
					sx= {{ 
						display: 'flex', 
						alignItems: 'center',
						backgroundColor: 'white',
						height: 40,
						py: 5,
						px: 3,
						mx: 10,
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
						See all listings 
					</Typography>
					<ArrowRightAltIcon sx={{ fontSize: '2rem', fill: '#1255FF' }}/>
				</Box>
			</Box>
			<Box sx= {{ 
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				px: 10,
				py: 8,
				minWidth: '100%',
				height: 'auto',
				}}	
			>
				<Box
					sx = {{ 
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 5,
						pb: 10
					}}
				>
					<img alt='placeholder' height='400' width='500' src={ placeholder }/>
					<Box sx={{ pt: 5 }}>
						<div>
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
									fontSize: 36,
								}}
							>
								You're in good hands
							</Typography>
						</div>
						<div style={{ width: '40%' }}>
							<Typography variant='body'>
								Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.
							</Typography>
						</div>
						<Button sx={{ 
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
							}}
						>
							Learn more
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
								fontSize: 36,
							}}
						>
							Find your next place to live
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							px: 2,
							py: 1,
							gap: 4
						}}
					>
						{
							findYourNextPlaceToLive.map((item, i) => {
								return (
									<Box sx={{ 
										display: 'flex', 
										alignItems: 'center', 
										borderRight: '1px solid rgba(151, 151, 151, 0.4)',
										py: 4,
										pr: 10
										}} 
										id={i}
									>
										<Typography
											variant="body"
											sx={{
												fontFamily: 'monospace',
												fontWeight: 700,
												color: 'black',
												textDecoration: 'none',
												fontSize: 16,
												mr: 1
											}}
										>
											{item}
										</Typography>
										<ExpandMoreIcon />
									</Box>
									)
								})
						}
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '20px 80px'
						}}
					>
						{
							card.map((item, i) => {
								return (
									<Card sx={{ width: '25%'}}>
										<CardActionArea>
											<CardMedia component="img" height="250" image={smallPlaceholder} alt="house" />
											<CardContent sx={{ p: 0 }}>
												<Typography 
													variant="h5" 
													component="div" 
													sx={{
														borderBottom: '1px solid rgba(151, 151, 151, 0.4)',
														px: 3,
														py: 4,
														fontWeight: 600
														}}
												>
													Placeholder {i + 1}
												</Typography>
												<Box 
													sx={{
														display: 'flex',
														justifyContent: 'center'
													}}
													>
													<Typography 
														variant="h6" 
														component="div" 
														sx={{
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															gap: 1,
															borderRight: '1px solid rgba(151, 151, 151, 0.4)',
															width: '33%',
															py: 2,
														}}
													>
														<BedIcon />
														{item.bedrooms}
													</Typography>
													<Typography 
														variant="h6" 
														component="div" 
														sx={{
															display: 'flex', 
															alignItems: 'center',
															borderRight: '1px solid rgba(151, 151, 151, 0.4)',
															width: '33%',
															gap: 1,
															py: 2,
															pl: 6
														}}
													>
														<BathtubIcon />
														{item.bathrooms}
													</Typography>
													<Typography 
														variant="h6" 
														component="div" 
														sx={{
															display: 'flex', 
															alignItems: 'center',
															width: '33%',
															gap: 1,
															py: 2,
															pl: 6
														}}
													>
														<GarageIcon />
														{item.carSpaces}
													</Typography>
												</Box>
											</CardContent>
										</CardActionArea>
									</Card>
								)
							})
						}
					</Box>
				</Box>
			</Box>
		</Container>
	)
}
