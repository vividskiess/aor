// PropertyCard.jsx
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import GrassIcon from '@mui/icons-material/Grass';

const PropertyCard = ({ property }) => {
	return (
		<Card sx={{ width: { xs: '100%', sm: '45%', md: '28%' } }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="200"
					image={property.image} // Assuming there's an image property in your data
					alt="house"
				/>
					<CardContent sx={{ p: 0 }}>
						<Typography
							variant="h5"
							component="div"
							sx={{
									borderBottom: '1px solid rgba(151, 151, 151, 0.4)',
									px: { xs: 2, sm: 1, md: 2 },
									py: { xs: 1, sm: 1, md: 2 },
									fontWeight: 600,
									fontSize: { xs: 15, md: 20 },
							}}
						>
								{property.Address}, {property.Postcode}
						</Typography>
						<Typography
								variant="h5"
								component="div"
								sx={{
										borderBottom: '1px solid rgba(151, 151, 151, 0.4)',
										px: { xs: 2, sm: 1, md: 2 },
										py: { xs: 1, sm: 1, md: 2 },
										fontWeight: 400,
										fontSize: { xs: 13, md: 18 },
								}}
						>
							Sale Price: ${property.Price.toLocaleString('en')}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
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
									p: 0.5,
									fontSize: '1.2em'
								}}
							>
								<BedIcon
									fontSize='inherit'
								>
								</BedIcon>
								{property.Rooms}
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
									fontSize: '1.2em'
								}}
							>
								<BathtubIcon
									fontSize='inherit'
								>
								</BathtubIcon>
								{property.Bathroom}
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
									fontSize: '1.2em'
								}}
							>
								<GrassIcon
									fontSize='inherit'
								>
								</GrassIcon>
								{property.Landsize}m&sup2;
							</Typography>
						</Box>
					</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default PropertyCard
