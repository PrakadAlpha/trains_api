const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train'
  },

  passengers: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Passenger' }],

  date: {
    type: Date,
    required: [true, "Please enter the date for booking"],
    default: Date.now
  }
  
});

module.exports = mongoose.model('Booking', bookingSchema);