import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Import the new Header

const DashboardLayout = () => {
    return (
        <div className="app-container">
            <Header />
            <main className="app-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;