import React from 'react';
import { Typography, TextField, Container, Grid, Button } from '@mui/material';

function ResultForm({ apiData, onBackClick }) {
    const result = apiData?.[0];

    return (
        <Container maxWidth="md">
            <Typography
                variant="h4"
                component="div"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: '#005643',
                    fontSize: '28px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    mb: '20px',
                }}
            >
                Results
            </Typography>
            <Grid container spacing={3}>
                {[
                    { label: 'Trips Per Acre (trips)', key: 'trips_per_acre' },
                    { label: 'Trip Duration (hours)', key: 'trip_duration' },
                    { label: 'Interest Per Hour (hours)', key: 'interest_per_hour' },
                    { label: 'Depreciation ($)', key: 'depreciation' },
                    { label: 'Per Year ($)', key: 'per_year' },
                    { label: 'Per Hour ($)', key: 'per_hour' },
                    { label: 'Cost Per Acre ($)', key: 'cost_per_acre' },
                    { label: 'Cost Per Ton ($)', key: 'cost_per_ton' },
                ].map((item) => (
                    <Grid item xs={12} sm={6} key={item.key}>
                        <TextField
                            fullWidth
                            label={item.label}
                            value={result ? result[item.key] : ''}
                            disabled={true}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={onBackClick}
                sx={{
                    marginTop: '20px',
                    backgroundColor: '#005643',
                    color: '#ffc82e',
                    height: '48px',
                    width: '100%',
                    '&:hover': {
                        backgroundColor: '#003c31',
                    },
                }}
            >
                Back
            </Button>
        </Container>
    );
}

export default ResultForm;