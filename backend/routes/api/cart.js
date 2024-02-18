const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const fetchUser = require('../../middlewares/auth')
const {Authenticate} = require('../../middlewares/tempAuth')
// router.post('/addtoCart',fetchUser,async(req,res)=>{
//     let userData = await User.findOne({_id:req.user.id});
//     const userCartData = await User.findOneAndUpdate({_id:req.user.id},
//             {$push: {cartData: {product_id: req.body.itemId,price:req.body.price}}},
//             {new:true}
//             )
    
//     res.send(userCartData.cartData)
// })  
router.post('/addtoCart',Authenticate,async(req,res)=>{
    const userCartData = await User.findOneAndUpdate({email:req.user.email},
            {$push: {cartData: {product_id: req.body.itemId,price:req.body.price}}},
            {new:true}
            )
    
    res.send(userCartData.cartData)
})  


router.post('/removeFromCart',Authenticate,async(req,res)=>{
    var access_token=null;
    var refresh_token=null;
    if(req.access_token){
        access_token = req.access_token
    }
    if(req.refresh_token){
        refresh_token=req.refresh_token
    }
    let userData = await User.findOne({email:req.user.email});
    let checkQuantity = await User.findOne({email:req.user.email,cartData: {product_id: req.body.itemId,price:req.body.price}})
    if(checkQuantity && checkQuantity.cartData.length > 0){
        checkQuantity = checkQuantity.cartData;
        checkQuantity.pop();
    }
    if(checkQuantity == 0){
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:[]},{new:true}
            )
        res.send({cartData:[],access_token,refresh_token});
    }
    else {
        userData = await User.findOneAndUpdate(
            {email:req.user.email},{cartData:checkQuantity},{new:true}
            )
        res.send({cartData:userData.cartData,access_token,refresh_token})
    }


})


// router.post('/removeFromCart',fetchUser,async(req,res)=>{
//     let userData = await User.findOne({_id:req.user.id});
//     let checkQuantity = await User.findOne({_id:req.user.id,cartData: {product_id: req.body.itemId,price:req.body.price}})
//     console.log(checkQuantity.cartData.length)
//     if(checkQuantity && checkQuantity.cartData.length > 0){
//         checkQuantity = checkQuantity.cartData;
//         console.log(checkQuantity)
//         checkQuantity.pop();
//         console.log(checkQuantity)
//     }
//     userData = await User.findOneAndUpdate(
//         {_id:req.user.id},{cartData:checkQuantity},{new:true}
//         )

//     res.send(userData.cartData)
// })
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