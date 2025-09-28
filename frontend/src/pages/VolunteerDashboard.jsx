import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerDashboard = () => {
    const [wasteType, setWasteType] = useState('Plastic');
    const [weight, setWeight] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // New state for the dynamic parts
    const [activeEvents, setActiveEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');

    useEffect(() => {
        // Fetch the list of active events when the component loads
        const fetchActiveEvents = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/events/active', config);
                setActiveEvents(data);
                // Set the default selection to the first event if it exists
                if (data.length > 0) {
                    setSelectedEventId(data[0]._id);
                }
            } catch (err) {
                setError('Could not fetch active events.');
            }
        };
        fetchActiveEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEventId) {
            setError('Please select an event.');
            return;
        }
        setMessage('');
        setError('');
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const logData = { eventId: selectedEventId, wasteType, weight: Number(weight) };

            await axios.post('http://localhost:5000/api/logs', logData, config);

            setMessage(`Successfully logged ${weight}kg of ${wasteType}!`);
            setWeight('');
        } catch (err) {
            setError('Failed to log waste. Please try again.');
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Waste Monitor Dashboard</h2>
            <p>Select an active event, the type of waste, and enter the weight in kilograms.</p>
            <form onSubmit={handleSubmit} className="waste-log-form">
                <div className="form-group">
                    <label>Active Event</label>
                    <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                        {activeEvents.length > 0 ? (
                            activeEvents.map(event => (
                                <option key={event._id} value={event._id}>{event.name}</option>
                            ))
                        ) : (
                            <option>No active events found</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label>Waste Type</label>
                    <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                        <option value="Food">Food</option>
                        <option value="Glass">Glass</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" step="0.1" placeholder="e.g., 5.5" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary">Submit Log</button>
                {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    );
};

export default VolunteerDashboard;