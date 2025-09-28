import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEventModal from '../components/CreateEventModal';
import { Link } from 'react-router-dom'; // <-- CHANGE #1: Import Link

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) {
                setError('You must be logged in to view events.');
                setLoading(false);
                return;
            }
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/events', config);
            setEvents(data);
        } catch (err) {
            setError('Failed to load events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="events-page">
            <CreateEventModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onEventCreated={fetchEvents}
            />

            <div className="page-header">
                <h2>Event Management</h2>
                <button onClick={() => setIsModalOpen(true)} className="create-event-btn">
                    + Create New Event
                </button>
            </div>

            <div className="event-list">
                {events.length === 0 ? (
                    <p>No events found. Create your first one!</p>
                ) : (
                    events.map(event => (
                        // --- CHANGE #2: Wrap the div with a Link component ---
                        <Link to={`/dashboard/event/${event._id}`} key={event._id} className="event-card-link">
                            <div className="event-card">
                                <h3>{event.name}</h3>
                                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p>Location: {event.location}</p>
                                <p>Status: <span className={`status-${event.status}`}>{event.status}</span></p>
                            </div>
                        </Link>
                        // --- End of Change ---
                    ))
                )}
            </div>
        </div>
    );
};

export default EventsPage;