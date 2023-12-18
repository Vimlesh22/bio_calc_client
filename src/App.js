import React from 'react';

import { Routes, Route } from 'react-router-dom';
import BiomassCalculator from './components/BiomassCalculator';
import SelectedCategory from './components/SelectedCategory';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="content-container">
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/biomass-calculator' element={<BiomassCalculator />} />
                    <Route path='/category/:id' element={<SelectedCategory />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;