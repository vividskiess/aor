import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Property() {
  const findYourNextPlaceToLive = [ 'Looking for', 'Location', 'Property Type', 'Price' ]

	return (
    <Container>
      <Box
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
    </Box>
  </Container>

	)	
}
