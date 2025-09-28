const express = require('express');
const router = express.Router();
const { 
    createEvent, 
    getMyEvents, 
    updateEventDmaic, 
    getEventById, 
    updateEvent, 
    deleteEvent,
    getActiveEvents,
    getFirstEvent // <-- 1. Make sure this is imported
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').post(createEvent).get(getMyEvents);

// These specific routes must come BEFORE the general '/:id' route
router.get('/active', getActiveEvents);
router.get('/first', getFirstEvent); // <-- 2. This is the new route you need to add

router.route('/:id/dmaic').put(updateEventDmaic);

router.route('/:id')
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);

module.exports = router;