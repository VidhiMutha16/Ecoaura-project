import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KPICard from '../components/KPICard'; // Assuming KPICard is in this path

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };

                // Fetch stats and users at the same time
                const [statsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/stats', config),
                    axios.get('http://localhost:5000/api/admin/users', config)
                ]);

                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                setError('Failed to fetch admin data. You might not have access.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading Admin Dashboard...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="kpi-grid">
                <KPICard title="Total Users" value={stats.totalUsers} />
                <KPICard title="Total Events" value={stats.totalEvents} />
                {/* Add more KPI cards as you create more stats */}
            </div>

            <div className="user-list-container">
                <h3>User Management</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;