const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    cartData:{
        type: Object
    },
    date: {
        type: Date,
        default:Date.now
    }
})

const User = mongoose.model("Users",userSchema);
module.exports = User