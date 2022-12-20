var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

const dotenv = require('dotenv');
dotenv.config();



const { body, validationResult } = require('express-validator');
  const JWT = require('jsonwebtoken');

  const bcrypt = require('bcryptjs');



  const config = require('../config');

   router.post('/register', async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hashpassword = bcrypt.hashSync(req.body.password, 8);

     // create user 

       try  {

         User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashpassword,
          },(err, user) => {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            const token = JWT.sign({id: user._id}, config.secret, {
              expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).send({ auth: true, token: token  , user: user });
          }
          )
//             const newUser = new User ({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hashpassword,


//             })
// // save user
//             const Usersave = await newUser.save();
//             res.send(Usersave);

       }
       catch(err){
              console.log(err);
              res.send(err).status(500);
       }

       //create token

       
   })


   // get user base on token
   router.get('/me', async(req,res) =>{
    const token = req.headers['x-access-token'];

    
    if(!token) return res.status(401).send({auth: false, message: 'No token provided'});




    // verify token 

    JWT.verify(token,config.secret, async(err, decoded) =>{

        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token'});
        
        // res.status(200).send(decoded);

        // send user info 


        // find user by id

        const userbyid = await User.findById(decoded.id);


        if(!userbyid) {
  
          return res.status(404).send('No user found')}
          else {
            return res.status(200).send(userbyid);
          };


       
        // const users  = await User.findById(decoded.id, {password: 0});

        // if(!users) return res.status(404).send('No user found');

        // res.status(200).send(users);

    })
   })



  

   module.exports = router;