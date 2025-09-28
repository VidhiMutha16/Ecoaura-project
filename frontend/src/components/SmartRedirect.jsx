import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SmartRedirect = ({ targetPage }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/events/first', config);
                if (data && data._id) {
                    navigate(`/dashboard/${targetPage}/${data._id}`);
                } else {
                    navigate('/dashboard/events');
                }
            } catch (err) {
                navigate('/dashboard/events');
            }
        };
        fetchAndRedirect();
    }, [navigate, targetPage]);
    return <div>Finding your event...</div>;
};
export default SmartRedirect;