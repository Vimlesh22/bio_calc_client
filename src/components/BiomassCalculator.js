import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ResultForm from './ResultForm';
import biomassImage from '../utils/t4.jpeg';

function BiomassCalculator() {
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

    const handleInputChange = (event, key) => {
        const { value } = event.target;
        const numericValue = parseFloat(value);
        setFormData({
            ...formData,
            [key]: { value: isNaN(numericValue) ? value : numericValue },
        });
    };

    const handleBackToForm = () => {
        setIsResultDisplayed(false);
    };

    const calculateBiomassMetrics = () => {
        try {
            const formDataValues = Object.entries(formData).reduce((acc, [key, { value }]) => {
                acc[key] = value;
                return acc;
            }, {});

            const {
                "Yield (Bales per Acre)": yieldValue,
                "Truck Capacity (Bales)": truck_capacity,
                "Trip Length (miles)": trip_length,
                "Fuel Economy (mpg)": fuel_economy,
                "Interest Rate (%)": interest_rate,
                "Labor ($/hr)": labor,
                "Fuel ($/g)": fuel,
                "Repairs ($/hr)": repairs,
                "Load Time (hours)": load_time,
                "Unload Time (hours)": unload_time,
                "Idling Time (hours)": idling_time,
                "Idling Fuel Use (gal/hr)": idling_fuel_use,
                "Loaded Speed (mph)": loaded_speed,
                "Unloaded Speed (mph)": unloaded_speed,
                "Purchase ($)": purchase,
                "Sales ($)": sales,
                "Years of Use (Years)": years_of_use,
                "Annual Hours of Use (hours)": annual_hours_of_use,
            } = formDataValues;

            // Calculate trips per acre using the formula (yield / truck_capacity)
            const trips_per_acre = yieldValue / truck_capacity;

            // Calculate trip duration
            const trip_duration =
                load_time +
                unload_time +
                idling_time +
                (trip_length / loaded_speed) +
                (trip_length / unloaded_speed);

            // Calculate interest per hour
            const interest_per_hour = (purchase * (interest_rate / 150 / 100));

            // Calculate depreciation
            const depreciation = purchase - sales;
            const per_year = depreciation / years_of_use;
            const per_hour = per_year / annual_hours_of_use;

            // Calculate cost per acre
            const cost_per_acre =
                trips_per_acre *
                ((labor + repairs + interest_per_hour + per_hour) * trip_duration +
                    (trip_length / fuel_economy) * 2 * fuel +
                    idling_time * idling_fuel_use * fuel);

            // Calculate cost per ton
            const cost_per_ton = cost_per_acre / yieldValue;

            // Create an array of objects to hold the calculated values
            const calculatedValues = [
                {
                    trips_per_acre,
                    trip_duration,
                    interest_per_hour,
                    depreciation,
                    per_year,
                    per_hour,
                    cost_per_acre,
                    cost_per_ton,
                },
            ];
            // Return the array of calculated values
            return calculatedValues;
        } catch (error) {
            console.error("Error calculating biomass metrics:", error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Calculate metrics using the updated function
            const calculatedMetrics = calculateBiomassMetrics();

            // Set the calculated metrics in state
            setResultData(calculatedMetrics);
            setIsResultDisplayed(true);
        } catch (error) {
            console.error('Error while calculating metrics:', error);
        } finally {
            setIsLoading(false);
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
                                        style={{ width: '100%', height: '300px' }}
                                    />
                                    <hr />
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            {Object.keys(formData).map((key) => (
                                                <Grid item xs={12} sm={4} key={key}>
                                                    <TextField
                                                        label={key}
                                                        name={key}
                                                        type={inputTypeMapping[key] || "text"}
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
                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: '#005643', color: '#ffc82e', height: '48px', marginTop: '10px' }}
                                                fullWidth
                                                href='/category/1'
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </form>
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