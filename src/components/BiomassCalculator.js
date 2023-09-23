import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import '../index.css';
import ResultForm from './ResultForm';
import biomassImage from '../utils/transportation.jpeg';


function BiomassCalculator() {
    // Define a mapping of parameter names to input types
    const inputTypeMapping = {
        "Yield (Bales per Acre)": "number",
        "Truck Capacity (Bales)": "number",
        "Trip Length (miles)": "number",
        "Fuel Economy (mpg)": "number",
        "Interest Rate (%)": "number",
        "Labor ($/hr)": "number",
        "Fuel ($/g)": "number",
        "Repairs ($/hr)": "number",
        "Load Time (hours)": "number",
        "Unload Time (hours)": "number",
        "Idling Time (hours)": "number",
        "Idling Fuel Use (gal/hr)": "number",
        "Loaded Speed (mph)": "number",
        "Unloaded Speed (mph)": "number",
        "Purchase ($)": "number",
        "Sales ($)": "number",
        "Years of Use (Years)": "number",
        "Annual Hours of Use (hours)": "number",
    };

    // Define initial form data and states
    const initialFormData = {
        "Yield (Bales per Acre)": { value: '', min: 0, max: 10000 },
        "Truck Capacity (Bales)": { value: '', min: 0, max: 10000 },
        "Trip Length (miles)": { value: '', min: 0, max: 10000 },
        "Fuel Economy (mpg)": { value: '', min: 0, max: 10000 },
        "Interest Rate (%)": { value: '', min: 0, max: 100 },
        "Labor ($/hr)": { value: '', min: 0, max: 10000 },
        "Fuel ($/g)": { value: '', min: 0, max: 10000 },
        "Repairs ($/hr)": { value: '', min: 0, max: 10000 },
        "Load Time (hours)": { value: '', min: 0, max: 10000 },
        "Unload Time (hours)": { value: '', min: 0, max: 10000 },
        "Idling Time (hours)": { value: '', min: 0, max: 10000 },
        "Idling Fuel Use (gal/hr)": { value: '', min: 0, max: 10000 },
        "Loaded Speed (mph)": { value: '', min: 0, max: 10000 },
        "Unloaded Speed (mph)": { value: '', min: 0, max: 10000 },
        "Purchase ($)": { value: '', min: 0, max: 10000 },
        "Sales ($)": { value: '', min: 0, max: 10000 },
        "Years of Use (Years)": { value: '', min: 0, max: 10000 },
        "Annual Hours of Use (hours)": { value: '', min: 0, max: 10000 },
    };

    const [formData, setFormData] = useState(initialFormData);
    const [resultData, setResultData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    // Handle input field changes
    const handleInputChange = (event, key) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            [key]: { value: parseFloat(value) || value },
        });
    };

    // Function to handle going back to the form
    const handleBackToForm = () => {
        setIsResultDisplayed(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const inputParams = {
                // Prepare input parameters for the API request
                yield: formData["Yield (Bales per Acre)"].value,
                truck_capacity: formData["Truck Capacity (Bales)"].value,
                trip_length: formData["Trip Length (miles)"].value,
                fuel_economy: formData["Fuel Economy (mpg)"].value,
                interest_rate: formData["Interest Rate (%)"].value,
                labor: formData["Labor ($/hr)"].value,
                fuel: formData["Fuel ($/g)"].value,
                repairs: formData["Repairs ($/hr)"].value,
                load_time: formData["Load Time (hours)"].value,
                unload_time: formData["Unload Time (hours)"].value,
                idling_time: formData["Idling Time (hours)"].value,
                idling_fuel_use: formData["Idling Fuel Use (gal/hr)"].value,
                loaded_speed: formData["Loaded Speed (mph)"].value,
                unloaded_speed: formData["Unloaded Speed (mph)"].value,
                purchase: formData["Purchase ($)"].value,
                sales: formData["Sales ($)"].value,
                years_of_use: formData["Years of Use (Years)"].value,
                annual_hours_of_use: formData["Annual Hours of Use (hours)"].value,
            };
            const response = await fetch('http://localhost:9001/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputParams),
            });

            if (response.ok) {
                const data = await response.json();
                setResultData(data);
            } else {
                console.error('API request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error while making the API request:', error);
        } finally {
            setIsLoading(false);
            setIsResultDisplayed(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <div className="background-container">
            <div className="forms-container">
                <div className="card-container" style={{ marginTop: '90px' }}>
                    <Card className="card" style={{ maxWidth: '1200px' }}>
                        <CardContent>
                            {isResultDisplayed ? (
                                <div className="result-container">
                                    <ResultForm apiData={resultData} onBackClick={handleBackToForm} />
                                </div>
                            ) : (
                                <div className="front">
                                    <Typography variant="h5" component="div" gutterBottom sx={{
                                        fontWeight: 'bold',
                                        color: '#005643',
                                        fontSize: '28px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        mb: '20px',
                                    }}>
                                        Biomass Bale Transportation Calculator
                                    </Typography>
                                    <img
                                        src={biomassImage}
                                        alt="Biomass"
                                        className="biomass-image"
                                        style={{ width: '100%', height: '200px' }}
                                    />
                                    <hr />
                                    <form onSubmit={handleSubmit}> {/* Add the form tag here */}
                                        <Grid container spacing={2}>
                                            {Object.keys(formData).map((key) => (
                                                <Grid item xs={12} sm={4} key={key}>
                                                    <TextField
                                                        label={key}
                                                        name={key}
                                                        type={inputTypeMapping[key] || "text"} // Use the input type from mapping, default to "text"
                                                        value={formData[key].value}
                                                        onChange={(e) => handleInputChange(e, key)}
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <div className="form-group" style={{ textAlign: 'right' }}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                disabled={isLoading}
                                                style={{ backgroundColor: '#005643', color: '#ffc82e', height: '48px' }}
                                                fullWidth
                                            >
                                                {isLoading ? 'Loading...' : 'Submit'}
                                            </Button>
                                        </div>
                                    </form> {/* Close the form tag here */}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BiomassCalculator;