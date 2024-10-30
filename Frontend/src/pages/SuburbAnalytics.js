import React from 'react'
import { Typography, Box, Paper, IconButton, InputBase, Button, Container } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import suburbBirdEye from '../assets/suburbBirdsEye.jpg'
import infographicsBanner from '../assets/InfographicsBanner.png'

export default function SuburbAnalytics() {
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
							Beautiful homes made for you
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
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder="Search Suburbs"
									inputProps={{ 'aria-label': 'search suburbs' }}
								/>
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
									<SearchIcon />
								</IconButton>
							</Paper>
							<Button 
								sx={{ 
									borderRadius: '10px', 
									backgroundColor: '#1255FF', 
									textTransform: 'none',
									py: 1.5
								}} 
								variant="contained"
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
			<Box sx={{ width: '100%', px: { xs: 2, sm: 2, md: 15, lg: 25 }}}>
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
							Fitzroy
						</Typography>
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
							Melbourne - Northern Region, VIC 3073
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
							$123,456
						</Typography>

						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 18, md: 20 },
								letterSpacing: -1.2
							}}
						>
							Market Insights for properties
						</Typography>
					</Box>
				</Box>
			</Box>
		</Container>
	)	
}
