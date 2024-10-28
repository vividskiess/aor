import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Infographics from './pages/Infographics.js'
import Property from './pages/Property.js'
import SuburbAnalytics from './pages/SuburbAnalytics.js'
import SuburbProfile from './pages/SuburbProfile.js'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      mt: '68.5px'
      // bgcolor: darkMode ? 'grey.900' : 'background.default', 
      // color: darkMode ? 'common.white' : 'common.black' 
      }}
    >
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
