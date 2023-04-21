const express = require('express')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/User')

const jwtSecret = "MynameisEndtoEndenCryptionmethod20"


router.post("/createuser" , 
body('email','Incorrect Email').isEmail(),
body('name').isLength({min:5}),
body('password','Incorrect Password').isLength({min:5})
,async(req,res) =>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.query.person}!`);
        res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)
        
        try {
       await User.create({
           name:req.body.name,
           password:secPassword,
           email:req.body.email,
           location:req.body.location
        }).then(res.json({success:true}))
        
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
        
    
})


router.post("/loginuser" , 
body('email','Incorrect Email').isEmail(),
body('password','Incorrect Password').isLength({min:5})
,async(req,res) =>{

    let email = req.body.email;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send(`Hello, ${req.query.person}!`);
        res.status(400).json({ errors: result.array() });
    } else{
        
        try {
                let userData = await User.findOne({email});
                if(!userData){
                    return res.status(400).json({errors:'Try logging again'})
                }
                const passCompare = bcrypt.compare(req.body.password,userData.password)
                if(!passCompare){
                    return res.status(400).json({errors:'Try logging again'})
                }
                
                else{
                    const data = {
                        user:{
                            id:userData.id
                        }
                    }

                    const authToken = jwt.sign(data,jwtSecret)
                    res.json({success:true,authToken:authToken})
                }
            } catch (error) {
                console.log(error)
                res.json({success:false})
            }
        
    }
})



module.exports = router;