require('dotenv').config();
require('./conn');

const express = require('express');
const cors = require('cors');

const {port} = require('./configs/keys')
const routes = require('./routes/routes')
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)

// app.use((err,req,res,next) => {
//     res.status(err.status || 500)
//     res.send({
//         error: {
//             message: err.message,
//             status: err.status || 500
//         }
//     })
// })

app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log("Server is running on Port : ",port);
})
