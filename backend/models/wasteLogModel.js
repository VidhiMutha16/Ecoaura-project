const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // The Volunteer user
    },
    wasteType: {
        type: String,
        required: true,
        enum: ['Plastic', 'Paper', 'Food', 'Glass', 'Other'],
    },
    weight: { // in kilograms
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const WasteLog = mongoose.model('WasteLog', wasteLogSchema);
module.exports = WasteLog;