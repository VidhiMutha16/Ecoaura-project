import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsPage = () => {
    const { eventId } = useParams();
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                // Added a safety check for the user info
                if (!userInfo || !userInfo.token) {
                    setError('You must be logged in to view this page.');
                    setLoading(false);
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/analytics/waste-composition/${eventId}`, config);
                
                setChartData({
                    labels: data.labels,
                    datasets: [{
                        label: 'Waste (kg)',
                        data: data.data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    }]
                });
            } catch (err) {
                setError("Failed to load analytics data.");
                console.error("Failed to load analytics", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [eventId]);

    if (loading) return <div>Loading analytics...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    // --- THIS IS THE FIX ---
    // We need to check chartData.datasets to see if there's data, not chartData.data
    const hasData = chartData && chartData.datasets && chartData.datasets[0].data.length > 0;

    return (
        <div className="analytics-page">
            <h2>Waste Composition for Event</h2>
            <div style={{ maxWidth: '400px', margin: 'auto' }}>
                {hasData ? <Pie data={chartData} /> : <p>No waste data logged for this event yet.</p>}
            </div>
        </div>
    );
};

export default AnalyticsPage;