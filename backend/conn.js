const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Yagna32:Yagna%402212@cluster0.mnriumm.mongodb.net/e-commerce')
.then(()=>{
    console.log("Database is Connected!!")
})
.catch((err)=>{
    console.log(err);
})