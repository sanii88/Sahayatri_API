const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema({

     vehicle_type:{
    type:String,
    required:true
     },

     departure_date:{
        type:String,
        required:true
         },

hireDays:{
    type:String,
    required:true
},

contact:{
    type:String,
    required:true
},

buyer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}]


},{timestamps:true})


const hiring = mongoose.model('Hiring',hiringSchema)
module.exports = hiring
