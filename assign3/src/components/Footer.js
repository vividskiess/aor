import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

export const Footer = () => {
  return (
    <>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
          py: { xs: 6, sm: 8 },
          px: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
					background: 'linear-gradient(225deg, rgba(2,26,86,1) 0%, rgba(0,0,0,1) 30%)',
					color: 'white',
          minWidth: '100%'
        }}
      >
      <Box sx= {{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        pb: 3,
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        borderOpacity: 0.5
        }}
        >
        <Typography
          variant="h4"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Make your dreams a
        </Typography>
        <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            letterSpacing: '-1px',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(34deg, rgba(18,85,255,1) 0%, rgba(36,161,200,1) 100%)'
            }}
        >
          reality
        </Typography>
      </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'inherit' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
              Product
            </Typography>
            <Link color="inherit" variant="body2" href="#">
              Features
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Testimonials
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Highlights
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Pricing
            </Link>
            <Link color="inherit" variant="body2" href="#">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
              Company
            </Typography>
            <Link color="inherit" variant="body2" href="#">
              About us
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Careers
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
              Legal
            </Typography>
            <Link color="inherit" variant="body2" href="#">
              Terms
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Privacy
            </Link>
            <Link color="inherit" variant="body2" href="#">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
