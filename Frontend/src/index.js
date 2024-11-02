import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline'; // CssBaseline for consistent baseline styles across browsers
import { BrowserRouter as Router } from 'react-router-dom'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';// Import MUI's ThemeProvider and createTheme for applying a theme

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* Wrap the app in ThemeProvider and pass the theme for consistent styling */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>  {/* Wrap the App component in Router */}
      <App />
    </Router>
    </ThemeProvider>
  </React.StrictMode>
);