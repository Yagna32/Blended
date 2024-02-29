const nodemailer = require('nodemailer')
const express = require('express')
const {email} = require('../../configs/keys')
const sendMail = require('../../middlewares/nodemailer')
const {Authenticate} =require('../../middlewares/tempAuth')
const router = express.Router();

router.get('/',(req,res)=>res.send('Sfja'))
router.get('/sendMail',Authenticate,async(req,res)=>{
sendMail(req.user.email)
res.json({
    success: true
})
})

module.exports = router