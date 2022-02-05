const express = require('express');

const Hirings = require('../models/hiringModel');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/hiring', function(req,res){
    Hirings.find()
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.get('/hiring/:id', function(req,res){
    const id = req.params.id;

    Hirings.findOne({_id:id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


router.post('/hiring/insert' , auth.verifyUser, function(req,res){

    const departure_date = req.body.departure_date;
    const vehicle_type = req.body.vehicle_type;
    const hireDays = req.body.hireDays;
    const contact = req.body.contact;
    buyer = req.userData._id

    const data = new Hirings({vehicle_type, departure_date, hireDays,contact,buyer});
    console.log(data);
    data.save()
    .then(function(){
        res.status(201).json({success:true , message:"successfully inserted"});
        console.log("hiring inserted");

    })
    .catch(function(){
        res.status(500).json({success:false , message:"error"})
    })
})

router.delete('/hiring/delete/:id', function(req,res){
    const id = req.params.id;
    Hirings.deleteOne({_id:id})
    .then(function(){
        res.status(201).json({success:true , message:"deleted successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})
router.put('/hiring/update/:id', function(req,res){
    const id = req.params.id;
    const departure_date = req.body.departure_date;
    const vehicle_type = req.body.vehicle_type;
    const hireDays = req.body.hireDays;
    const contact = req.body.contact;

    console.log("updated!!");

    Hirings.updateOne({_id:id} , {departure_date:departure_date, vehicle_type:vehicle_type, hireDays:hireDays , 
        contact:contact})
    .then(function(){
        res.status(201).json({success:true , message:"updated successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

module.exports = router;