const Event = require('../models/eventModel');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer)
const createEvent = async (req, res) => {
    const { name, date, location, expectedAttendees } = req.body;

    try {
        const event = new Event({
            name,
            date,
            location,
            expectedAttendees,
            organizer: req.user._id, // Associate the event with the logged-in user
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get events for the logged-in organizer
// @route   GET /api/events
// @access  Private (Organizer)
const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user._id });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// Add this new function to eventController.js

// @desc    Update an event's DMAIC data
// @route   PUT /api/events/:id/dmaic
// @access  Private (Organizer)
const updateEventDmaic = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the logged-in user is the organizer of this event
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Update the dmaic field with the data from the request body
        event.dmaic = req.body;

        const updatedEvent = await event.save();
        res.json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add this new function
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add these two new functions inside eventController.js

const updateEvent = async (req, res) => {
    try {
        const { name, date, location, status } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        event.name = name || event.name;
        event.date = date || event.date;
        event.location = location || event.location;
        event.status = status || event.status;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Add this new function
const getActiveEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: 'active' });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Add this new function
const getFirstEvent = async (req, res) => {
    try {
        // Find the most recent event for the logged-in user by sorting by creation date
        const event = await Event.findOne({ organizer: req.user._id }).sort({ createdAt: -1 });
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'No events found for this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



// Don't forget to add the new functions to your exports at the bottom
module.exports = { createEvent, getMyEvents, updateEventDmaic, getEventById, updateEvent, deleteEvent,getActiveEvents,getFirstEvent };
