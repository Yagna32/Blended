const express = require('express')
const path = require('path')
const router = express.Router();

const Product = require('../../models/Product')

const {port} = require('../../configs/keys');
const upload = require('../../middlewares/multer');
const { fileURLToPath } = require('url');

router.post('/addProduct',async(req,res)=>{
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
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    await product.save();
    res.json({
        success: true,
        name:req.body.name
    })
})

router.post('/removeProduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed",req.body.id);
    res.json({
        success: true,
        name:req.body.name
    })
})

router.get('/allProducts',async(req,res)=>{
    const product = await Product.find();
    res.send(product)
})

router.get('/newCollections',async(req,res)=>{
    let products = await Product.find();
    let newCollections = products.slice(0).slice(-8);
    res.send(newCollections);  
})

router.get('/popular/:category',async(req,res)=>{
    let products = await Product.find({category:req.params.category})
    let popular = products.slice(0,4);
    res.send(popular);
})

//Creating upload enpoint for images
const uploadsPath = path.resolve(__dirname, '../../upload/images'); // Adjust the path as needed
console.log(uploadsPath)
router.use('/images',express.static(uploadsPath));
router.post('/upload',upload.array('product',4),(req,res)=>{
    var image_urls = []
    req.files.forEach((file)=>{
        image_urls.push(`http://localhost:${port}/api/v1/Product/images/${file.filename}`)
    })
    console.log(image_urls);
    res.json({
        success:1,
        image_urls
    })
})

module.exports =  router;