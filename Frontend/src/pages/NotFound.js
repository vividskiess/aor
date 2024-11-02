import React from 'react';
import { Typography, Box, Button } from '@mui/material';

// if a user goes to a page that does not exist they will be redirected to this page
export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4, height: '100vh', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
			<Button href="/" variant='contained'>Return to home page</Button>
    </Box>
  );
}
