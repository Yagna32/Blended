const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/Users')

router.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check) {
        return res.status(400).json({
            success: false,
            errors:"Email is already in use"
        })
    }
    let cart = {}
    cart[0] = 0;

    const newUser = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData: cart
    })
    console.log(newUser)
    await newUser.save();
    const data = {
        user:{
            id:newUser.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({
        success: true,
        token
    })
    console.log('after token')

})

router.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            } 
            const token = jwt.sign(data,process.env.SECRET_TOKEN);
            res.json({success:true,token})
        }
        else {
            res.json({
                success: false,
                error: "Wrong Password"
            })
        }
    }
    else {
        res.json({
            success: false,
            error: "User does not exist"
        })
    }
})


module.exports =  router;