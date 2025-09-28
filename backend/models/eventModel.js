const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId, // This links the event to a User
        required: true,
        ref: 'User', // The 'User' model
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['planning', 'active', 'completed', 'cancelled'],
        default: 'planning',
    },
    expectedAttendees: {
        type: Number,
        default: 0,
    },
    // --- THIS IS THE NEWLY ADDED FIELD ---
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Each item in the array is a reference to a User
    }],
    // --- END OF NEW FIELD ---
    dmaic: {
        define: {
            problemStatement: { type: String, default: '' },
            projectScope: { type: String, default: '' },
            goals: { type: String, default: '' },
        },
        measure: {
            dataCollectionPlan: { type: String, default: '' },
            baselinePerformance: { type: String, default: '' },
        },
        analyze: {
            rootCauseAnalysis: { type: String, default: '' },
            dataAnalysis: { type: String, default: '' },
        },
        improve: {
            improvementActions: { type: String, default: '' },
            implementationPlan: { type: String, default: '' },
        },
        control: {
            monitoringPlan: { type: String, default: '' },
            standardization: { type: String, default: '' },
        },
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;