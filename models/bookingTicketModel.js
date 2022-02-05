const mongoose = require('mongoose');

const bookingTicketSchema = new mongoose.Schema({
    route: {
        type: String,
        enum:['Select none','Kathmandu-Pokhara','Kathmandu-Chitwan','Kathmandu-Butwal','Kathmandu-Lumbini'],
        default:'Select none',
        required: true
    },

    vehicle_type: {
        type: String,
        enum:['Bus','Micro','Jeep'],
        default:'Bus',
        required: true
    },

    departure_date: {
        type: String,
        required: true
    },

    seatNo: {
        type: String,
        enum:['1','2','3','4'],
        default:'1',
        required: true
    },
    boarding_point: {
        type: String,
        enum:['Koteshwor','Buspark','Kalanki'],
        default:'Koteshwor',
        required: true
    },
    boarding_person: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


const bookingTicket = mongoose.model('BookingTicket', bookingTicketSchema)
module.exports = bookingTicket
