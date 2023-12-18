import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import logo from '../utils/logo.png';
import '../css/Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    fontWeight: 'bold', // Bold text
  };

  const headerStyles = {
    backgroundColor: isScrolled ? 'rgba(0, 86, 67, 0.8)' : '#005643', // Transparent when scrolled
    transition: 'background-color 0.3s ease',
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar className="header" position="fixed" style={headerStyles}>
      <Toolbar>
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            width="250"
            height="40"
          />
        </div>
        <Box sx={{ flexGrow: 1 }} />

        {/* Hamburger menu button for mobile devices */}
        <IconButton
          onClick={toggleMobileMenu}
          sx={{ display: { sm: 'block', md: 'none' } }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Desktop buttons for larger screens */}
        <div className="desktop-buttons">
          <Button color="inherit" style={buttonStyles}>
            Home
          </Button>
          <Button href="https://www.ndsu.edu/agriculture/extension/about-ndsu-extension" color="inherit" style={buttonStyles}>
            About
          </Button>
          <Button href="https://www.ndsu.edu/agriculture/extension/contact-us-0" color="inherit" style={buttonStyles}>
            Contact
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;