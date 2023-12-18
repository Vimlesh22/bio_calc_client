import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


import '../css/Dashboard.css'; // Import the CSS file for styling

import { categories } from '../constants/categoryList';
import SelectedCategory from './SelectedCategory';

const Dashboard = () => {
    const navigate = useNavigate(); // Access the navigate function
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCardCategory = (category) => {
        setSelectedCategory(category);
        navigate(`/category/${category.id}`);

    }

    return (
        <div className="category-container">
            {selectedCategory ? (
                <SelectedCategory id={selectedCategory.id} />
            ) :
                categories.map((category) => (
                    <Card key={category.id} className="category-card" onClick={() => handleCardCategory(category)}>
                        <CardMedia
                            component="img"
                            alt={category.title}
                            height="auto"
                            image={category.imageUrl}
                        />
                        <CardContent style={{ backgroundColor: '#e2e2e2' }}>
                            <Typography variant="h6" component="div">
                                {category.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
};

export default Dashboard;