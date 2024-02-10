const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const fetchUser = require('../../middlewares/auth')
router.post('/addtoCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await User.findOneAndUpdate(
        {_id:req.user.id},{cartData: userData.cartData}
        )
    res.send(userData)
})  

router.post('/removeFromCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] -=1;
    await User.findOneAndUpdate(
        {_id:req.user.id},{cartData: userData.cartData}
        )

    res.send(userData)
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