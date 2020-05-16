const express = require('express');
const {protect, authorize} = require('../middleware/auth');
const {getTrain, getTrains, editTrain, deleteTrain, addTrain} = require('../controllers/trains')

const router = express.Router();

router.route('/')
      .get(protect, getTrains);

router.route('/')
      .post(protect, authorize('admin'), addTrain);

router.route('/:id')
      .get(protect, authorize('admin'), getTrain)
      .put(protect, authorize('admin'), editTrain)
      .delete(protect, authorize('admin'), deleteTrain);

module.exports = router;
