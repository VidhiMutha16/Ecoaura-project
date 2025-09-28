import React from 'react';

const KPICard = ({ title, value, change }) => {
    // Determine the class name based on the change
    const isPositive = change && change.startsWith('+');
    const changeClassName = isPositive ? 'kpi-change positive' : 'kpi-change negative';

    return (
        <div className="kpi-card">
            <p className="kpi-title">{title}</p>
            <h3 className="kpi-value">{value}</h3>
            {/* Only render the change if it exists */}
            {change && <p className={changeClassName}>{change}</p>}
        </div>
    );
};

export default KPICard;