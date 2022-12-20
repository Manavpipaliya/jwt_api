var express = require('express');
var app = express();


 const dotenv = require('dotenv');
 dotenv.config();



const bodyParser = require('body-parser');
const mongoose = require('mongoose');





mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

 })
   .then(()=>{
         console.log('DB Connected')
   })
    .catch((err)=>{
        console.log(err)
    })






 
const  UserController = require('./user/UserController');
app.use('/users', UserController);


const authController = require('./auth/AuthController');
app.use('/auth', authController);
module.exports = app;