const express = require('express');
const {protect} = require('../middleware/auth');
const {getPassenger, getPassengers, editPassenger, deletePassenger, addPassenger} = require('../controllers/passengers')


const router = express.Router();

router.route('/')
      .get(protect, getPassengers);

router.route('/')
      .post(protect, addPassenger);

router.route('/:id')
      .get(protect, getPassenger)
      .put(protect, editPassenger)
      .delete(protect, deletePassenger);

module.exports = router;
