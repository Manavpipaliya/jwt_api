var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');



// create route for register 


router.post('/register', async(req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg:'Please enter all fields'})
    }


     try {

        const newuser = new User ({
            name,
            email,
            password
            
        })

        const user = await newuser.save();
        res.json(user).status(200);
     }
     catch(err){
        console.log(err);
     }

   
})



module.exports = router;