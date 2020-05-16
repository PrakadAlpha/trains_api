const asyncHandlers = require('../middleware/async');
const Train = require('../models/Train');

exports.getTrains = asyncHandlers(async (req, res) => {
const trains = await Train.find();
res.status(200).json(trains);
}); 

exports.getTrain = asyncHandlers(async (req, res) => {

  const train = await Train.findById(req.params.id);
  if(!train){
  return res.status(400).json({success: false, message: `Bootcamp with id ${req.params.id} not found`});
  } 
  res.status(200).json({success:true, data: train});   

}); 

exports.addTrain = asyncHandlers(async (req, res) => {
  
  let newTrain = await Train.findOne({user: req.user.id});

  if(newTrain){
    return res.status(400).json({success: false, message: `Train already exist..`});
  }
  
  if(req.user.role !== 'admin'){
    return res.status(400).json({success: false, message:`Only admin can add trains..`});
  }

  const train = await Train.create(req.body);

  return res.status(201).json({success:true, data: train}); 
      
}); 


exports.editTrain = asyncHandlers(async (req, res) => {

  let train = await Train.findByIdAndUpdate(req.params.id);

  if(!train){
    return res.status(400).json({success: false, message: `Train with id ${req.params.id} not found`});
  }

  if(req.user.role !== 'admin'){
    return res.status(400).json({success: false, message:`User with id ${req.user.id} not authorized to do this operation`});
  }

  train = await Train.findByIdAndUpdate(req.params.id, req.body, {new: true});

  return res.status(200).json({success:true, data: train}); 

}); 

exports.deleteTrain = asyncHandlers(async (req, res) => {

  const train = await Train.findById(req.params.id);

  if(!train){
    return res.status(400).json({success: false, message: `Train with id ${req.params.id} not found`});
  }

  if(req.user.role !== 'admin'){
    return res.status(400).json({success: false, message: `User with id ${req.user.id} not authorized to do this operation`});
  }

  await Train.findByIdAndDelete(req.params.id);

 return res.status(200).json({success:true, message: 'Train deleted..!'}); 

}); 

