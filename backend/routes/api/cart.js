const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const {Authenticate} = require('../../middlewares/tempAuth')

router.post('/addtoCart',Authenticate,async(req,res)=>{
    const userCartData = await User.findOneAndUpdate({email:req.user.email},
            {$push: {cartData: {product_id: req.body.itemId,price:req.body.price}}},
            {new:true}
            )
            console.log(userCartData.cartData)
    res.send(userCartData.cartData)
})  


router.post('/removeFromCart',Authenticate,async(req,res)=>{
    let checkQuantity = await User.findOne({email:req.user.email,cartData: {product_id: req.body.itemId,price:req.body.price}})
    if(checkQuantity && checkQuantity.cartData.length > 0){
        checkQuantity = checkQuantity.cartData;
        checkQuantity.pop();
    }
    console.log(checkQuantity)
    if(checkQuantity <= 0){
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:[]},{new:true}
            )
    }
    else {
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:checkQuantity},{new:true}
            )
    }
    res.send(userData.cartData);
})

router.get('/getCart',Authenticate,async(req,res)=>{
    let userData = await User.findOne({email: req.user.email})
    if(userData)
    {
        res.json(userData.cartData)
        return;
    }
    res.json()

})


module.exports =  router;