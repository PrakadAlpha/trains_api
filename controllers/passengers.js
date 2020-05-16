const asyncHandlers = require('../middleware/async');
const Passenger = require('../models/Passenger');

exports.getPassengers = asyncHandlers(async (req, res) => {
      const passengers = await Passenger.find({user: req.user.id});
      res.status(200).json(passengers);
}); 

exports.getPassenger = asyncHandlers(async (req, res) => {

      const passenger = await Passenger.findById(req.params.id);
      if(!passenger){
      return res.status(400).json({success: false, message: `Bootcamp with id ${req.params.id} not found`});
      } 
      res.status(200).json({success:true, data: passenger});   
}); 

exports.addPassenger = asyncHandlers(async (req, res) => {

      req.body.user = req.user.id;  

      let newPassenger = await Passenger.findOne({user: req.user.id});
    
      if(newPassenger && req.user.role !== 'admin'){
        return res.status(400).json({success: false, message: `Passenger already exist..`});
      }
    
      const passenger = await Passenger.create(req.body);
    
      res.status(201).json({success:true, data: passenger}); 
      
}); 


exports.editPassenger = asyncHandlers(async (req, res) => {

    let passenger = await Passenger.findByIdAndUpdate(req.params.id);

    if(!passenger){
      return res.status(400).json({success: false, message: `Bootcamp with id ${req.params.id} not found`});
    }

    if(passenger.user.toString() !== req.user.id && req.user.role !== 'admin'){
      return res.status(400).json({success: false, message: `User not authorized to do this operation`});
    }

    passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({success:true, data: passenger}); 
}); 

exports.deletePassenger = asyncHandlers(async (req, res) => {

      const passenger = await Passenger.findById(req.params.id);

      if(!passenger){
        return res.status(400).json({success: false, message: `Bootcamp with id ${req.params.id} not found`});
      }
  
      if(passenger.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return res.status(400).json({success: false, message:`User with id ${req.user.id} not authorized to do this operation`});
      }
  
      await Passenger.findByIdAndDelete(req.params.id);

      res.status(200).json({success:true, message: "Passenger deleted.."}); 

}); 