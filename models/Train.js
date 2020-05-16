const mongoose = require('mongoose');

const trainSchema = mongoose.Schema({

  name: {
    type: String,
    required: [true, "Please enter a train name"]
  },
  source: {
    type: String,
    required: [true, "Please enter a train source"] 
  },
  destination:{
    type: String,
    required: [true, "Please enter a train destination"] 
  },
  price: {
    type: Number,
    required: [true, "Please enter a train rate"] 
  }
})

module.exports = mongoose.model('Train', trainSchema);