const express = require('express')

const Users = require('../models/userModel');
const Tickets = require('../models/bookingTicketModel');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const upload = require('../middleware/fileupload');

//register with validation
router.post('/users/register' , [
    check('username' , "username is required!").not().isEmpty(),
    check('email', "email is required!").not().isEmpty(),    
    check('address', "address is required!").not().isEmpty() ,
    check('phone', "phone is required!").not().isEmpty() ,
    check('password', "password is required!").not().isEmpty()
] , (req, res , next) => {

    console.log("registered");

    const errors = validationResult(req);
    //check if the email exists                  // username,email,address,phone,password
    if (errors.isEmpty()) {
        const username = req.body.username;
        const email = req.body.email;
        const address = req.body.address;
        const phone = req.body.phone;
        const password = req.body.password;

        bcrypt.hash(password, 10, (err, hash) => {
            //save password in hash and inside form
            const data = new Users({ username: username, phone: phone, email:email,address:address, password: hash });
            if (req.body.userType) {
                data.userType = req.body.userType;
            } else{
                data.userType = "Customer"
            }
            data.save()
                .then(result => {
                    //success
                    if (result) {
                        const token = jwt.sign({ uid: data._id }, 'secretkey');
                        res.status(201).json({
                            success: true,
                            message: "Successfully Registered!!",
                            token,
                            user: data
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: "something went wrong",
                        success: false
                    });

                });
        });
    } else {
        let simplifiedErrors = {};
        errors.array().forEach(error => {
            simplifiedErrors[error.param] = error.msg;
        });
        res.status(400).json({ success: false, message: simplifiedErrors });
    }

})


//login
router.post('/users/login', function(req,res){

    const phone = req.body.phone;
    const password = req.body.password;
    const userType = req.body.userType;

    //check if the email exists or not
    Users.findOne({phone:phone})
    .then(function(userData){
        if(userData===null){
            return res.status(200).json({success : false})
        }
        
        bcrypt.compare(password, userData.password , function(error,result){
            if(result===false){
                return res.status(200).json({success : false})
            }
            
            //check login credentials
            //need to create a token
            const token = jwt.sign({YourId : userData._id } , 'anysecretkey');
            // res.status(200).json({success : true, token : token , message : "Auth Success!"})
            res.status(200).json({success : true, token : token , message : "Auth Success!",userType:userData.userType})

        })
    })
    .catch()

})

//show all users
router.get('/users/show' , auth.verifyUser , function(req,res){
    Users.find()
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

//to delete users
router.delete('/users/delete/:id' , auth.verifyUser, function(req,res){
    
    const id = req.params.id;

    Users.deleteOne({_id:id})
    .then(function(){
        res.status(201).json({success:true , message:"deleted successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


//get user by id 
router.get('/users/getMe', auth.verifyUser, function(req,res){
    const id = req.userData._id
   
    Users.findOne({_id: id})
    .then(function(userData){
        res.status(200).json({ success: true, user: userData })
    })
    .catch(function(e){
        res.status(500).json({success:false , message:e})
    })
})


//update
router.put('/users/update/:id', auth.verifyUser,   function(req,res){

    const id12 = req.params.id;
    const username = req.body.username;
    const phone = req.body.phone;
    const password = req.body.password;
    const email = req.body.email;
    const address = req.body.address;


    Users.updateOne({_id : id12}, {username : username ,phone : phone , password:password , email:email , address:address})
    .then(function(){
        res.status(201).json({success:true , message:"updated successfully" })
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})






//to upload file
router.post('/profile/upload' ,  upload.single('myimage') , function(req , res){
    if(req.file==undefined){
        return res.status(400).json({message : "only png/jpeg/jpg images are allowed!"})
    }  
    const data = new Users({
              profile_pic : req.file.filename
      }) 
      data.save()
      .then(function(result){
        res.status(201).json({message : "profile photo uploaded!!"})
    })
      .catch(function(error){
        res.status(500).json({message : error})
      })

})

router.get('/users/bookings', auth.verifyUser,  function(req,res){
    const id = req.userData._id

    Tickets.findOne({_id : id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})


router.get('/bookings', auth.verifyUser,  function(req,res){
    const id = req.userData._id

    Tickets.find({buyer : id})
    .then(function(data){
        res.status(201).json({success:true , data:data});
    })
    .catch(function(error){
        res.status(500).json({success:false , message:error})
    })
})

module.exports = router;