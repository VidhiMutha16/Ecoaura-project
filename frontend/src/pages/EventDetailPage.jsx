import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateEventModal from '../components/CreateEventModal';
import { toast } from 'react-toastify';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEvent = useCallback(async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`http://localhost:5000/api/events/${eventId}`, config);
            setEvent(data);
        } catch (err) {
            console.error("Failed to fetch event", err);
            setError('Could not load event details. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent]);

    const handleDelete = () => {
        const deleteEvent = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`http://localhost:5000/api/events/${eventId}`, config);
                toast.success('Event deleted successfully!');
                navigate('/dashboard/events');
            } catch (error) {
                console.error('Failed to delete event', error);
                toast.error('Failed to delete event.');
            }
        };

        const Confirmation = ({ closeToast }) => (
            <div>
                <p>Are you sure you want to delete this event?</p>
                <button className="btn-secondary" onClick={closeToast}>Cancel</button>
                <button className="btn-danger" style={{ marginLeft: '1rem' }} onClick={() => { deleteEvent(); closeToast(); }}>
                    Confirm
                </button>
            </div>
        );

        toast.warn(<Confirmation />, { autoClose: false, closeOnClick: false, draggable: false });
    };

    if (loading) return <div>Loading event details...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!event) return <div>Event not found.</div>;

    return (
        <>
            <CreateEventModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onEventCreated={fetchEvent}
                eventToEdit={event}
            />
            <div className="event-detail-page">
                <h2>{event.name}</h2>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Status:</strong> <span className={`status-${event.status}`}>{event.status}</span></p>

                <div className="event-actions">
                    <Link to={`/dashboard/dmaic/${eventId}`} className="btn-primary">View DMAIC</Link>
                    <Link to={`/dashboard/analytics/${eventId}`} className="btn-secondary">View Analytics</Link>
                    <button onClick={() => setIsModalOpen(true)} className="btn-secondary">Edit Event</button>
                    <button onClick={handleDelete} className="btn-danger">Delete Event</button>
                </div>
            </div>
        </>
    );
};

export default EventDetailPage;