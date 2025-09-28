import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom'; // <-- 1. Add Link
import logo from '../assets/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const notificationCount = 3; // Placeholder

    // Define links for different roles
    const adminLinks = ( <NavLink to="/dashboard/admin">Dashboard</NavLink> );
    const vendorLinks = ( <NavLink to="/dashboard/vendor">Dashboard</NavLink> );
    const volunteerLinks = ( <NavLink to="/dashboard/volunteer">Dashboard</NavLink> );
    const organizerLinks = (
        <>
            <NavLink to="/dashboard/organizer">Dashboard</NavLink>
            <NavLink to="/dashboard/events">Events</NavLink>
            <NavLink to="/dashboard/dmaic">Six Sigma DMAIC</NavLink>
            <NavLink to="/dashboard/analytics">Analytics</NavLink>
            <NavLink to="/dashboard/learning">Learning Resources</NavLink>
        </>
    );

    return (
        <header className="app-header">
            <div className="header-left">
                <div className="logo">
                    <img src={logo} alt="EcoAura Logo" className="logo-img" />
                </div>
                <nav className="main-nav">
                    {userInfo?.role === 'Admin' && adminLinks}
                    {userInfo?.role === 'Organizer' && organizerLinks}
                    {userInfo?.role === 'Vendor' && vendorLinks}
                    {userInfo?.role === 'Volunteer' && volunteerLinks}
                </nav>
            </div>
            <div className="header-right">
                {userInfo?.role === 'Organizer' && (
                    // 2. Change this button to a Link
                    <Link to="/dashboard/events" className="create-event-btn">
                        + Create New Event
                    </Link>
                )}
                <div className="notification-bell">
                    🔔
                    {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
                </div>
                <div className="user-profile">
                    <span>{userInfo ? userInfo.name : 'User'}</span>
                    <small>{userInfo ? userInfo.role : 'N/A'}</small>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </header>
    );
};

export default Header;