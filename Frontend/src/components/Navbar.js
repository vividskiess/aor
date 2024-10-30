import React, { useState } from 'react';
import HouseIcon from '@mui/icons-material/House';
import {  AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'

export default function Navbar() {
	const pages = [
		{ name: 'Home', link: '/' },
		{ name: 'Infographics', link: '/Infographics'},
		{ name: 'Property', link: '/Property' },
		{ name: 'Suburb Analytics',  link: '/SuburbAnalytics' },
		{ name: 'Suburb Profile', link: '/SuburbProfile' }, 
	]
	
return (
	<AppBar 
		position="fixed" 
		sx={{ 
			background: 'linear-gradient(45deg, rgba(2,26,86,1) 0%, rgba(0,0,0,1) 55%)' 
		}} 
	>
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
						<Link style={{ textDecoration: 'none' }} to={page.link}>
							<Button
								key={page.name}
								sx={{ 
									my: 2, 
									color: 'white', 
									display: 'block', 
									fontWeight: 'bold' 
								}}
							>
								{ page.name }
							</Button>
						</Link>
					))}
				</Box>
			</Toolbar>
		</Container>
	</AppBar>
	)
}
