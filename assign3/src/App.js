import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Infographics from './pages/Infographics.js';
import Property from './pages/Property.js';
import SuburbAnalytics from './pages/SuburbAnalytics.js';
import SuburbProfile from './pages/SuburbProfile.js'
// About page component
function About() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        This is the About page. Here, you can add more information about the project or your team.
      </Typography>
    </Container>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      // bgcolor: darkMode ? 'grey.900' : 'background.default', 
      // color: darkMode ? 'common.white' : 'common.black' 
      }}>
      <Navbar />
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='Infographics' element={ <Infographics /> } />
        <Route path='Property' element={ <Property /> } />
        <Route path='SuburbAnalytics' element={ <SuburbAnalytics /> } />
        <Route path='SuburbProfile' element={ <SuburbProfile /> } />
      </Routes>
      
      <Footer />
    </Box>
  );
}

export default App;
