const router = require('express').Router()
const productRoute = require('./api/product')
const authRoute = require('./api/auth')
const cartRoute = require('./api/cart')

const { app } = require('../configs/keys')
const api = app.apiURL

router.use(`${api}/Product`,productRoute);
router.use(`${api}/Cart`,cartRoute);
router.use(`${api}/`,authRoute);
router.use(api,(req,res)=>res.status(404).send("No API route found"));


module.exports = router