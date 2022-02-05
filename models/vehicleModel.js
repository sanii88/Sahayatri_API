const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
   
    vehicle_type:{
        type:String,
        required:true
    },
    vehicle_number:{
        type:String,
        required:true
    },
    vehicle_image:{
        type:String,
        required:false
    }

},{timestamps:true})


const vehicle = mongoose.model('vehicle',vehicleSchema)
module.exports = vehicle
