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
				<Box 
					sx= {{ 
						display: 'flex', 
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
						See all listings 
					</Typography>
					<ArrowRightAltIcon sx={{ fontSize: '2rem', fill: '#1255FF' }}/>
				</Box>
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
					<img alt='placeholder' style={{ maxWidth: '50%', height: 'auto', paddingLe: 0, margin: 0 }} src={ placeholder }/>
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
								Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.
							</Typography>
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
							width: { xs: '50%', md: '70%' },
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
								fontSize: { xs: 20, md: 34 },
							}}
						>
							Find your next place to live
						</Typography>
					</Box>
					{/* <Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
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
										pr: { xs: 0, md: 6 }
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
					</Box> */}
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
							card.map((item, i) => {
								return (
									<Card sx={{ width: { xs: '100%', sm: '45%', md: '25%' } }} >
										<CardActionArea>
											<CardMedia component="img" height="200" image={smallPlaceholder} alt="house" />
											<CardContent sx={{ p: 0 }}>
												<Typography 
													variant="h5" 
													component="div" 
													sx={{
														borderBottom: '1px solid rgba(151, 151, 151, 0.4)',
														px: { xs: 2, sm: 1, md: 4 }, 
														py: { xs: 1, sm: 1, md: 2 },
														fontWeight: 600,
														fontSize: { xs: 20 }
														}}
												>
													Placeholder {i + 1}
												</Typography>
												<Box 
													sx={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center'
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
															justifyContent: 'center',
															borderRight: '1px solid rgba(151, 151, 151, 0.4)',
															width: '33%',
															gap: 1,
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
															justifyContent: 'center',
															width: '33%',
															gap: 1,
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
