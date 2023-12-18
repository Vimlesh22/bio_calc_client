import React from 'react';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import Dashboard from './Dashboard';

const Home = () => {
    return (
        <div className="conatiner">
            <Header />
            <Dashboard />
            <Footer />
        </div>
    );
}

export default Home;