const express = require('express');

const Tickets = require('../models/adminTicket');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/adminTicket', auth.verifyUser, function(req,res){
    Tickets.find()
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.get('/adminTicket/:id', auth.verifyUser,  function(req,res){
    const id = req.params.id;

    Tickets.findOne({_id:id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
      
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


router.post('/adminTicket/insert' , auth.verifyUser, function(req,res){

    const route = req.body.route;
    const departure_date = req.body.departure_date;
    const vehicle_type = req.body.vehicle_type;
    const seatNo = req.body.seatNo;
    const boarding_point = req.body.boarding_point;
    const price = req.body.price;
    buyer = req.userData._id

    // console.log (buyer);
    const data = new Tickets({
        route, vehicle_type, departure_date, seatNo,boarding_point,price ,buyer
    });
    console.log(data);
    data.save()
    .then(function(){
        res.status(201).json({success:true , message:"successfully inserted"});
        console.log("ticket inserted");

    })
    .catch(function(error){
        // console.log(error);
        res.status(500).json({success:false , message:error})
    })
})

router.delete('/adminTicket/delete/:id', auth.verifyUser, function(req,res){
    const id = req.params.id;
    Tickets.deleteOne({_id:id})
    .then(function(){
        res.status(201).json({success:true , message:"deleted successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})
router.put('/adminTicket/update/:id', auth.verifyUser, function(req,res){
    const id = req.params.id;
    const route = req.body.route;
    const departure_date = req.body.departure_date;
    const vehicle_type = req.body.vehicle_type;
    const seat = req.body.seat;
    const boarding_point = req.body.boarding_point;
    const price = req.body.price;



    console.log("updated!!");

    Tickets.updateOne({_id:id} , {route:route ,departure_date:departure_date, vehicle_type:vehicle_type, seat:seat, boarding_point:boarding_point ,  price:price})
    .then(function(){
        res.status(201).json({success:true , message:"updated successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

module.exports = router;