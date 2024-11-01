import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Infographics from './pages/Infographics.js'
import Property from './pages/Property.js'
import SuburbAnalytics from './pages/SuburbAnalytics.js'

function App() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%'
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
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
