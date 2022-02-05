const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
   
    route:{
        type:String,
        required:true
    }


},{timestamps:true})


const route = mongoose.model('Route',routeSchema)
module.exports = route
