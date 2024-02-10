const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("Database is Connected!!")
})
.catch((err)=>{
    console.log(err);
})