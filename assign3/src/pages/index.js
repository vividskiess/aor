import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import banner from "../assets/landingPageBanner.png"

export const Index = () => {
	return (
		<Container disableGutters sx = {{ minWidth: '100%' }}>
			<Box
				sx = {{
					py: 12,
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

			</Box>
		</Container>
  )
}
