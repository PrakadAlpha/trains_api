const express = require('express');
const {protect} = require('../middleware/auth');
const {getBooking, getBookings, addBooking, deleteBooking} = require('../controllers/bookings')

const router = express.Router();

router.route('/')
      .get(protect, getBookings);

router.route('/')
      .post(protect, addBooking);

router.route('/:id')
      .get(protect, getBooking)
      .delete(protect, deleteBooking);

module.exports = router;
