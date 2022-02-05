const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
   
    departure_date:{
        type:Date,
        required:true
    }

},{timestamps:true})


const schedule = mongoose.model('schedule',scheduleSchema)
module.exports = schedule
