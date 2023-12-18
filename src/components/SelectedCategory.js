import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { categoriesList } from '../constants/categoryList';

const SelectedCategory = () => {
    const { id } = useParams(); // Access the id parameter from the route

    return (
        <div className="selected-category-card">
            <CardContent>
                <ul className="item-list">
                    {categoriesList[id].map((item) => (
                        <Card key={item.id} className="item-card">
                            <CardContent style={{ backgroundColor: '#e2e2e2' }}>
                                <Link to={item.path}>
                                    <Typography variant="h6" component="div">
                                        {item.title}
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            </CardContent>
            <Button
                variant="contained"
                style={{ backgroundColor: '#005643', color: '#ffc82e', height: '48px', maxWidth: '1856.01px', margin: '0px 0px 16px 32px' }}
                fullWidth
                href='/'
            >
                Back
            </Button>
        </div>
    );
}

export default SelectedCategory;