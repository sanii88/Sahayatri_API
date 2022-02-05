const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');


module.exports.verifyUser = function(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'anysecretkey');

        Users.findOne({_id : userData.YourId})
        .then(function(result){
              req.userData = result;
              next()
        })
        .catch(function(err){
            res.status(401).json({error : err})
        })
    }
    catch(err){
        res.status(401).json({error : err})
    }
}

module.exports.verifyAdmin = function(req, res, next){
    if(!req.userData){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    else if(req.userData.userType!=='Admin'){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    next();
}


module.exports.verifyCustomer =  function(req, res, next){
    if(!req.userData){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    else if(req.userData.userType!=='Customer'){
        return res.status(401).json({message : "Unauthorized!!"})
    }
    next();
}


