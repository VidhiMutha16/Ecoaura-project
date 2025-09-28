import React from 'react';
import CourseCard from '../components/CourseCard';

const LearningResources = () => {
    // This would come from an API in a real app
    const courses = [
        { title: 'Six Sigma for Event Management', duration: '6 Hours', modules: 6, progress: 75, rating: 4.8 },
        { title: 'Zero Waste Event Planning', duration: '8 Hours', modules: 8, progress: 100, rating: 4.9 },
        { title: 'Vendor Sustainability Management', duration: '2.5 Hours', modules: 5, progress: 30, rating: 4.7 },
    ];

    return (
        <div className="learning-resources-page">
            <h2>Learning Resources</h2>
            <p>Master Six Sigma and zero waste event management through our comprehensive learning paths.</p>
            <div className="course-grid">
                {courses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    );
};

export default LearningResources;