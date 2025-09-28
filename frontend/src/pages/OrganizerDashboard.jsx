import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KPICard from '../components/KPICard';

const OrganizerDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Get user info and token from localStorage
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) {
                    // Handle case where user is not logged in
                    setError('You must be logged in to view this data.');
                    setLoading(false);
                    return;
                }

                // Set up headers for the authenticated request
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                // Fetch data from the protected endpoint
                const { data } = await axios.get('http://localhost:5000/api/data/organizer-stats', config);
                setStats(data);
            } catch (err) {
                setError('Failed to load dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []); // The empty array [] means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="dashboard-organizer">
            <div className="dashboard-header">
                <h2>Organizer Dashboard</h2>
                <p>Manage your sustainable events and track progress</p>
            </div>

            {stats && (
                <div className="kpi-grid">
                    <KPICard title="Active Events" value={stats.activeEvents} change={stats.activeEventsChange} />
                    <KPICard title="Total Attendees" value={stats.totalAttendees} change={stats.attendeesChange} />
                    <KPICard title="Avg. Waste Reduction" value={stats.avgWasteReduction} change={stats.reductionChange} />
                    <KPICard title="Sustainability Score" value={stats.sustainabilityScore} change={stats.scoreChange} />
                </div>
            )}
        </div>
    );
};

export default OrganizerDashboard;