const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const fetchUser = require('../../middlewares/auth')
router.post('/addtoCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    const userCartData = await User.findOneAndUpdate({_id:req.user.id},
            {$push: {cartData: {product_id: req.body.itemId,price:req.body.price}}},
            {new:true}
            )
    
    res.send(userCartData.cartData)
})  

router.post('/removeFromCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    let checkQuantity = await User.findOne({_id:req.user.id,cartData: {product_id: req.body.itemId,price:req.body.price}})
    console.log(checkQuantity.cartData.length)
    if(checkQuantity && checkQuantity.cartData.length > 0){
        checkQuantity = checkQuantity.cartData;
        console.log(checkQuantity)
        checkQuantity.pop();
        console.log(checkQuantity)
    }
    userData = await User.findOneAndUpdate(
        {_id:req.user.id},{cartData:checkQuantity},{new:true}
        )

    res.send(userData.cartData)
})

router.post('/getCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id: req.user.id})
    if(userData)
    {
        res.json(userData.cartData)
        return;
    }
    res.send({})

})


module.exports =  router;