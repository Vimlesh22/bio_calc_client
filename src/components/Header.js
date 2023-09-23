import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../utils/logo.png';
import '../css/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add a scroll event listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const buttonStyles = {
    color: '#ffc82e', // Yellow color
    fontWeight: 'bold', // Bold text
  };

  const headerStyles = {
    backgroundColor: isScrolled ? 'rgba(0, 86, 67, 0.8)' : '#005643', // Transparent when scrolled
    transition: 'background-color 0.3s ease',
  };

  return (
    <AppBar className="header" position="fixed" style={headerStyles}>
      <Toolbar>
        <div className="logo">
          <img
            src={logo} // Use the logo URL here
            alt="Logo"
            width="250" // Adjust the width as needed
            height="40"
          />
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div" className="navigation">
          <Button color="inherit" style={buttonStyles}>
            Home
          </Button>
          <Button color="inherit" style={buttonStyles}>
            About
          </Button>
          <Button color="inherit" style={buttonStyles}>
            Contact
          </Button>
          {/* Add more buttons as needed */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;