import React from 'react'
import { Typography, Box, Paper, IconButton, InputBase, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import suburbBirdEye from '../assets/suburbBirdsEye.jpg'

export default function SuburbAnalytics() {
	return (
		<>
			<Box sx={{ py: 6, px: 20}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						gap: 5,
						backgroundColor: 'rgba(223, 223, 223, 1)',
						px: 6,
						pt: 6,
						pb: 10,
						borderRadius: '34px',
					}}
				>
					<Box sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						width: '50%',
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
								fontSize: 32,
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
								fontSize: 16,
							}}
						>
							In oculis quidem se esse admonere interesse enim maxime placeat, facere possimus, omnis. Et quidem faciunt, ut labore et accurate disserendum et harum quidem exercitus quid.
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}>
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
						<img style={{ borderRadius: '20px', height: '250px' }} src={suburbBirdEye} alt="suburb birds eye view" />
					</Box>
				</Box>
			</Box>
			
		</>
	)	
}
