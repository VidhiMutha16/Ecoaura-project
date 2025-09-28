import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DmaicPage = () => {
    const { eventId } = useParams();
    const [dmaicData, setDmaicData] = useState(null);
    const [activeTab, setActiveTab] = useState('define');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) {
                    setError('You must be logged in to view this page.');
                    setLoading(false);
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`http://localhost:5000/api/events/${eventId}`, config);

                // Set the data if it exists, otherwise provide a default empty structure
                setDmaicData(data.dmaic || {
                    define: { problemStatement: '', projectScope: '', goals: '' },
                    measure: { dataCollectionPlan: '', baselinePerformance: '' },
                    analyze: { rootCauseAnalysis: '', dataAnalysis: '' },
                    improve: { improvementActions: '', implementationPlan: '' },
                    control: { monitoringPlan: '', standardization: '' },
                });
            } catch (err) {
                setError("Failed to load DMAIC data");
            } finally {
                setLoading(false);
            }
        };
        fetchEventData();
    }, [eventId]);

    const handleChange = (phase, field, value) => {
        setDmaicData(prev => ({ ...prev, [phase]: { ...prev[phase], [field]: value } }));
    };

    const handleSave = async () => {
         try {
            setMessage('');
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`http://localhost:5000/api/events/${eventId}/dmaic`, dmaicData, config);
            setMessage('Changes saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Failed to save changes.');
        }
    };

    if (loading) return <div>Loading DMAIC Dashboard...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!dmaicData) return <div>Could not load data structure.</div>;

    // --- THIS SECTION IS NOW SAFER ---
    const renderTabContent = () => {
        switch (activeTab) {
            case 'define':
                return (
                    <>
                        <h3>Define Phase</h3>
                        <textarea placeholder="Problem Statement..." value={dmaicData?.define?.problemStatement || ''} onChange={e => handleChange('define', 'problemStatement', e.target.value)} />
                        <textarea placeholder="Project Scope..." value={dmaicData?.define?.projectScope || ''} onChange={e => handleChange('define', 'projectScope', e.target.value)} />
                        <textarea placeholder="Goals..." value={dmaicData?.define?.goals || ''} onChange={e => handleChange('define', 'goals', e.target.value)} />
                    </>
                );
            case 'measure':
                 return (
                    <>
                        <h3>Measure Phase</h3>
                        <textarea placeholder="Data Collection Plan..." value={dmaicData?.measure?.dataCollectionPlan || ''} onChange={e => handleChange('measure', 'dataCollectionPlan', e.target.value)} />
                        <textarea placeholder="Baseline Performance..." value={dmaicData?.measure?.baselinePerformance || ''} onChange={e => handleChange('measure', 'baselinePerformance', e.target.value)} />
                    </>
                );
            case 'analyze':
                 return (
                    <>
                        <h3>Analyze Phase</h3>
                        <textarea placeholder="Root Cause Analysis..." value={dmaicData?.analyze?.rootCauseAnalysis || ''} onChange={e => handleChange('analyze', 'rootCauseAnalysis', e.target.value)} />
                        <textarea placeholder="Data Analysis & Findings..." value={dmaicData?.analyze?.dataAnalysis || ''} onChange={e => handleChange('analyze', 'dataAnalysis', e.target.value)} />
                    </>
                );
            case 'improve':
                 return (
                    <>
                        <h3>Improve Phase</h3>
                        <textarea placeholder="Improvement Actions..." value={dmaicData?.improve?.improvementActions || ''} onChange={e => handleChange('improve', 'improvementActions', e.target.value)} />
                        <textarea placeholder="Implementation Plan..." value={dmaicData?.improve?.implementationPlan || ''} onChange={e => handleChange('improve', 'implementationPlan', e.target.value)} />
                    </>
                );
            case 'control':
                 return (
                    <>
                        <h3>Control Phase</h3>
                        <textarea placeholder="Monitoring Plan..." value={dmaicData?.control?.monitoringPlan || ''} onChange={e => handleChange('control', 'monitoringPlan', e.target.value)} />
                        <textarea placeholder="Standardization..." value={dmaicData?.control?.standardization || ''} onChange={e => handleChange('control', 'standardization', e.target.value)} />
                    </>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="dmaic-page">
            <div className="page-header">
                <h2>Six Sigma DMAIC Framework</h2>
                <button onClick={handleSave} className="btn-primary">Save Changes</button>
            </div>
            {message && <div className="save-message">{message}</div>}
            <div className="dmaic-tabs">
                <button onClick={() => setActiveTab('define')} className={activeTab === 'define' ? 'active' : ''}>Define</button>
                <button onClick={() => setActiveTab('measure')} className={activeTab === 'measure' ? 'active' : ''}>Measure</button>
                <button onClick={() => setActiveTab('analyze')} className={activeTab === 'analyze' ? 'active' : ''}>Analyze</button>
                <button onClick={() => setActiveTab('improve')} className={activeTab === 'improve' ? 'active' : ''}>Improve</button>
                <button onClick={() => setActiveTab('control')} className={activeTab === 'control' ? 'active' : ''}>Control</button>
            </div>
            <div className="dmaic-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default DmaicPage;