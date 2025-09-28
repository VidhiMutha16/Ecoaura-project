import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const CreateEventModal = ({ isOpen, onRequestClose, onEventCreated, eventToEdit }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const isEditMode = Boolean(eventToEdit);

    // This effect runs when the modal opens or the eventToEdit changes
    useEffect(() => {
        if (isEditMode && eventToEdit) {
            // If in edit mode, fill the form with the event's data
            setName(eventToEdit.name);
            setDate(new Date(eventToEdit.date).toISOString().split('T')[0]);
            setLocation(eventToEdit.location);
        } else {
            // If in create mode, clear the form
            setName('');
            setDate('');
            setLocation('');
        }
    }, [eventToEdit, isEditMode, isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const eventData = { name, date, location };

            if (isEditMode) {
                // If editing, send a PUT request
                await axios.put(`http://localhost:5000/api/events/${eventToEdit._id}`, eventData, config);
            } else {
                // If creating, send a POST request
                await axios.post('http://localhost:5000/api/events', eventData, config);
            }

            onEventCreated(); // Refresh the parent component's data
            onRequestClose(); // Close the modal
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} event. Please try again.`);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            <h2>{isEditMode ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-group">
                    <label>Event Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onRequestClose} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">{isEditMode ? 'Update Event' : 'Create Event'}</button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateEventModal;