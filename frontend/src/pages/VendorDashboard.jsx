import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };

                const { data } = await axios.get('http://localhost:5000/api/vendor/dashboard', config);
                setMyEvents(data.events);
            } catch (err) {
                setError('Failed to fetch vendor data. You might not have access.');
            } finally {
                setLoading(false);
            }
        };
        fetchVendorData();
    }, []);

    if (loading) return <div>Loading Vendor Dashboard...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="vendor-dashboard">
            <h2>Vendor Dashboard</h2>
            <p>Welcome! Here are the events you are participating in.</p>

            <div className="event-list">
                {myEvents.length === 0 ? (
                    <p>You have not been assigned to any events yet.</p>
                ) : (
                    myEvents.map(event => (
                         <Link to={`/dashboard/event/${event._id}`} key={event._id} className="event-card-link">
                            <div className="event-card">
                                <h3>{event.name}</h3>
                                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p>Location: {event.location}</p>
                                <p>Status: <span className={`status-${event.status}`}>{event.status}</span></p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VendorDashboard;