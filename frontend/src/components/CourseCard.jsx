import React from 'react';

const CourseCard = ({ title, duration, modules, progress, rating }) => {
    return (
        <div className="course-card">
            <h4>{title}</h4>
            <div className="course-meta">
                <span>{duration}</span> | <span>{modules} Modules</span> | <span>⭐ {rating}</span>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{progress}% Complete</p>
        </div>
    );
};

export default CourseCard;