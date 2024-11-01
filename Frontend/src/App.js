import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Infographics from './pages/Infographics.js'
import PropertySales from './pages/PropertySales.js'
import SuburbAnalytics from './pages/SuburbAnalytics.js'
import NotFound from './pages/NotFound.js'

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
        <Route path='Property' element={ <PropertySales /> } />
        <Route path='SuburbAnalytics' element={ <SuburbAnalytics /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
