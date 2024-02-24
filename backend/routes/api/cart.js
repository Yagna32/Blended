const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const {Authenticate} = require('../../middlewares/tempAuth')
const {Redis} = require('ioredis')

const redisClient = new Redis()

const getUserCachedCart= (req,res,next)=>{
    const email = req.user.email;
    redisClient.get(email,(err,data)=>{
        if(err) throw err;
        if(data !== null) {
            console.log(data)
            res.send(JSON.parse(data))
        }
        else {
            next();
        }
    })
}

router.post('/addtoCart',Authenticate,async(req,res)=>{
    const updatedUser = await User.findOneAndUpdate({email:req.user.email},
        {$push: {cartData: {product_id: req.body.itemId,price:req.body.price}}},
        {new:true}
    )
    console.log(updatedUser.cartData)
    
    redisClient.setex(updatedUser.email,60,JSON.stringify(updatedUser.cartData));

    res.send(updatedUser.cartData)
})  


router.post('/removeFromCart',Authenticate,async(req,res)=>{
    let userCart = await User.findOne({email:req.user.email,cartData: {product_id: req.body.itemId,price:req.body.price}})
    if(userCart && userCart.cartData.length > 0){
        userCart = userCart.cartData;
        userCart.pop();
    }
    console.log(userCart)
    if(userCart <= 0){
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:[]},{new:true}
            )
    }
    else {
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:userCart},{new:true}
            )
    }
    redisClient.setex(userData.email,60,JSON.stringify(userData.cartData));
    res.send(userData.cartData);
})

router.get('/getCart',Authenticate,getUserCachedCart,async(req,res)=>{
    let userData = await User.findOne({email: req.user.email})
    if(userData)
    {
        redisClient.setex(userData.email,60,JSON.stringify(userData.cartData))
        res.json(userData.cartData)
        return;
    }
    res.json()

})


module.exports =  router;