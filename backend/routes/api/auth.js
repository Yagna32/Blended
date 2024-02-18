const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {signAccessToken,signRefreshToken} = require('../../middlewares/tempAuth')
const User = require('../../models/Users')

router.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check) {
        return res.status(400).json({
            success: false,
            errors:"Email is already in use"
        })
    }
    const newUser = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    await newUser.save();
    const access_token = await signAccessToken(newUser);
    const refresh_token = await signRefreshToken(newUser);
    res.json({
        success: true,
        access_token,
        refresh_token
    })

})

router.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user) {
        const validPass = req.body.password === user.password;
        if(validPass){
            const newUser = {
                name:req.body.username,
                email:req.body.email,
                password:req.body.password
            }
            const access_token = await signAccessToken(newUser);
            const refresh_token = await signRefreshToken(newUser);
            res.json({
                success: true,
                access_token,
                refresh_token
            })
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