import React from 'react';
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import BiomassCalculator from './components/BiomassCalculator';

const App = () => {
    return (
        <div className="App">
            <Header />
            <div className="forms-container">
                <BiomassCalculator />
            </div>
            <Footer />
        </div>
    );
}

export default App;