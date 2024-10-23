import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import {  AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';


export const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const pages = ['Home', 'Infographics', 'Property', 'Suburb Analytics', 'Suburb Profile']

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	
return (
	<>
		<AppBar position="static" sx={{ background: 'linear-gradient(45deg, rgba(2,26,86,1) 0%, rgba(0,0,0,1) 55%)' }} >
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<HouseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="#app-bar-with-responsive-menu"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.05rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Alpha Omega Realtors.
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
					{pages.map((page) => (
						<Button
							key={page}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
						>
							{page}
						</Button>
					))}
				</Box>

			</Toolbar>
		</Container>
	</AppBar>
	</>
	)
}
