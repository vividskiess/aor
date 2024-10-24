import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import banner from "../assets/landingPageBanner.png"
import placeholder from '../assets/placeholder.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Index = () => {
	const findYourNextPlaceToLive = [ 'Looking for', 'Location', 'Property Type', 'Price' ]
	
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
							py: 5,
							gap: 3
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid black' }}>
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
								Looking for
							</Typography>
							<ExpandMoreIcon />
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid black' }}>
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
								Looking for
							</Typography>
							<ExpandMoreIcon />
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid black' }}>
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
								Looking for
							</Typography>
							<ExpandMoreIcon />
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid black' }}>
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
								Looking for
							</Typography>
							<ExpandMoreIcon />
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
  )
}
