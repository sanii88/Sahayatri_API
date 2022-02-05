const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
     email:{
        type:String,
        required: [true,'Email address is required' ],
        match:    [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true


    },
    userType:{
        type:String,
        enum:['Admin','Customer'],
        default:'Customer'
    },
    profile_pic:{
        type:String,
        required:false
    }

    // bookings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'BookingTicket'
    // }]

})


const user = mongoose.model('User',userSchema)
module.exports = user
