const express = require('express');
const mongoose = require('mongoose');

require('./dbConnect/dbConnect');
const userRoute1 = require('./routes/userRoute');
const routeRoute1 = require('./routes/routeRoute');
const ticketRoute1 = require('./routes/bookingTicketRoute');
const scheduleRoute1 = require('./routes/scheduleRoute');
const hiringRoute1 = require('./routes/hiringRoute');
const adminTicketRoute = require('./routes/adminTicketRoute');
const cors = require('cors');
const bodyParser= require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));

app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRoute1);
app.use(routeRoute1);
app.use(ticketRoute1);
app.use(scheduleRoute1);
app.use(hiringRoute1);
app.use(adminTicketRoute);



app.listen(90);