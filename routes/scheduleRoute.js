const express = require('express');

const Schedules = require('../models/scheduleModel')
const router = new express.Router();

router.get('/schedule', function(req,res){
    Schedules.find()
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.get('/schedule/:id', function(req,res){
    const id = req.params.id;

    Schedules.findOne({_id:id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


router.post('/schedule/insert' , function(req,res){
    console.log("schedule inserted");
    const data = new Schedules(req.body);
    data.save()
    .then(function(){
        res.status(201).json({success:true , message:"successfully inserted"})
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.delete('/schedule/delete/:id', function(req,res){
    const id = req.params.id;
    Schedules.deleteOne({_id:id})
    .then(function(){
        res.status(201).json({success:true , message:"deleted successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})
router.put('/schedule/update/:id', function(req,res){
    const id = req.params.id;
    const departure_date = req.body.departure_date;

    console.log("updated!!");

    Schedules.updateOne({_id:id} , {departure_date:departure_date})
    .then(function(){
        res.status(201).json({success:true , message:"updated successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

module.exports = router;