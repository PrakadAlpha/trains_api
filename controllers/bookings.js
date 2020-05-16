const asyncHandlers = require('../middleware/async');
const Booking = require('../models/Booking');

exports.getBookings = asyncHandlers(async (req, res) => {
      const bookings = await Booking.find({user: req.user.id}).populate('passengers').populate('train');
      res.status(200).json({success:true, data: bookings});
}); 

exports.getBooking = asyncHandlers(async (req, res) => {

      const booking = await Booking.findById(req.params.id).populate('passengers').populate('train');
      if(!booking){
      return res.status(400).json({success: false, message: `Bootcamp with id ${req.params.id} not found`});
      } 
      res.status(200).json({success:true, data: booking}); 
}); 

exports.addBooking = asyncHandlers(async (req, res) => {
  req.body.user = req.user.id;
  const booking = await Booking.create(req.body);
  res.status(201).json({success:true, data: booking}); 
}); 

exports.deleteBooking = asyncHandlers(async (req, res) => {

    const booking = await Booking.findById(req.params.id);

    if(!booking){
      return res.status(400).json({success: false, message: `Booking with id ${req.params.id} not found`});
    }

    if(booking.user.toString() !== req.user.id && req.user.role !== 'admin'){
      return res.status(400).json({success: false, message: `User with id ${req.user.id} not authorized to do this operation`});
    }

    Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({success:true, data: booking}); 

}); 