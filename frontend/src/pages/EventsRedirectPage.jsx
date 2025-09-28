import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventsRedirectPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Immediately navigate to the events list page
        navigate('/dashboard/events');
    }, [navigate]);

    return <h4>Please select an event first. Redirecting...</h4>;
};

export default EventsRedirectPage;