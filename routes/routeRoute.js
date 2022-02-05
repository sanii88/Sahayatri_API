const express = require('express');

const Routes = require('../models/routeModel')
const router = new express.Router();

router.get('/route', function(req,res){
    Routes.find()
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.get('/route/:id', function(req,res){
    const id = req.params.id;

    Routes.findOne({_id:id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


router.post('/route/insert' , function(req,res){
    console.log("route inserted");
    const data = new Routes(req.body);
    data.save()
    .then(function(){
        res.status(201).json({success:true , message:"successfully inserted"})
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

router.delete('/route/delete/:id', function(req,res){
    const id = req.params.id;
    Routes.deleteOne({_id:id})
    .then(function(){
        res.status(201).json({success:true , message:"deleted successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})
router.put('/route/update/:id', function(req,res){
    const id = req.params.id;
    const route = req.body.route;

    console.log("updated!!");

    Routes.updateOne({_id:id} , {route:route})
    .then(function(){
        res.status(201).json({success:true , message:"updated successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

module.exports = router;