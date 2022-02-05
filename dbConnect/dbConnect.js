const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sahayatri',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(con=>{
    console.log('Connection successful at' , con.connection.host)
})