import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HouseIcon from '@mui/icons-material/House';
import { AppBar, Toolbar, Typography, Container, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';

export default function Navbar() {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const pages = [
		{ name: 'Home', link: '/' },
		{ name: 'Infographics', link: '/Infographics'},
		{ name: 'Property', link: '/Property' },
		{ name: 'Suburb Analytics',  link: '/SuburbAnalytics' },
	]

	const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

return (
	<AppBar position="static" sx={{ background: 'linear-gradient(45deg, rgba(2,26,86,1) 0%, rgba(0,0,0,1) 55%)' }} >
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={handleOpenNavMenu}
					sx={{ 
						mr: 2,
						display: { xs: 'flex', md: 'none' }
					}}
				>
					<MenuIcon />
				</IconButton>
				<HouseIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'flex' },
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
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{ display: { xs: 'block', md: 'none' } }}
					>
						{pages.map((page, i) => (
							<MenuItem  key={i} onClick={handleCloseNavMenu}>
								<Link style={{ textDecoration: 'none' }} to={page.link}>
									<Typography sx={{ textAlign: 'center' }}>{ page.name }</Typography>
								</Link>
							</MenuItem>
						))}
					</Menu>
				</Box>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, justifyContent: {md: 'flex-end'} }}>
					{pages.map((page, i) => (
						<Link style={{ textDecoration: 'none' }} to={page.link} key={i}>
							<Button
								onClick={handleCloseNavMenu}
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
