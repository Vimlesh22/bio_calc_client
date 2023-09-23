import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import '../css/Footer.css'; // Import the CSS file for styling

const Footer = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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

    const footerStyles = {
        backgroundColor: isScrolled ? '#005643' : '#005643',
        transition: 'background-color 0.3s ease',
    };

    const typographyStyles = {
        color: '#ffc82e',
        backgroundColor: isScrolled ? '#005643' : '#005643', // Set background color
        // Make it slightly transparent on scroll
    };

    return (
        <footer className="footer" style={footerStyles}>
            <Paper elevation={0} square>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="body1" style={typographyStyles}>
                            ©2023 North Dakota State University, an equal opportunity, affirmative action institution.
                            <br />
                            Contact NDSU at (701) 231-8011 | Privacy Statement | NDSU Webmaster
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </footer>
    );
}

export default Footer;