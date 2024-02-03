const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

require('./conn');
const Product = require('./models/Product')
const User = require('./models/Users')

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

//Database Connection string 
//mongodb+srv://Yagna32:<password>@cluster0.mnriumm.mongodb.net/


app.get('/',(req,res)=>{
    res.send("Express app is running");
})

app.post('/addProduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id=1;
    }
    console.log(req.body);
    console.log('body');
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    res.json({
        success: true,
        name:req.body.name
    })
})

app.post('/removeProduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed",req.body.id);
    res.json({
        success: true,
        name:req.body.name
    })
})

app.get('/allProducts',async(req,res)=>{
    const product = await Product.find();
    res.send(product)
})

app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if(check) {
        return res.status(400).json({
            success: false,
            errors:"Email is already in use"
        })
    }
    let cart = {}
    cart[0] = 0;
    console.log(req.body)

    const newUser = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData: cart
    })
    console.log('after new')
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

app.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            } 
            const token = jwt.sign(data,'secret_ecom');
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

app.get('/newCollections',async(req,res)=>{
    let products = await Product.find();
    let newCollections = products.slice(1).slice(-8);
    res.send(newCollections);  
})

app.get('/popular/:category',async(req,res)=>{
    let products = await Product.find({category:req.params.category})
    let popular = products.slice(0,4);
    res.send(popular);
})

const fetchUser = async(req,res,next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({
            errors: "No Token Found"
        })
    }
    else {
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error) {
            res.status(401).send({
                errors: "Wrong Token"
            })
        }
    }
}

app.post('/addtoCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await User.findOneAndUpdate(
        {_id:req.user.id},{cartData: userData.cartData}
        )
    res.send("Added")
})  

app.post('/removeFromCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] -=1;
    await User.findOneAndUpdate(
        {_id:req.user.id},{cartData: userData.cartData}
        )
    res.send("Removed")
})

app.post('/getCart',fetchUser,async(req,res)=>{
    let userData = await User.findOne({id: req.user.id})
    res.json(userData.cartData)
})
// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage})

//Creating upload enpoint for images
app.use('/images',express.static('upload/images'));
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log("Server is running on Port : ",port);
})
