const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
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

mongoose.pluralize(false)
const User = mongoose.model("Users",userSchema);
module.exports = User