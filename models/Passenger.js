const mongoose = require('mongoose');

const passengerSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "Please enter the passenger name"]
  },
  age: {
    type: Number,
    required: [true, "Please enter the passenger age"]
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, "Please enter the passenger gender"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Passenger', passengerSchema);