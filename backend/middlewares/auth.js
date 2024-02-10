const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")

const fetchUser = async(req,res,next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({
            errors: "No Token Found"
        })
    }
    else {
        try {
            const data = jwt.verify(token,process.env.SECRET_TOKEN);
            req.user = data.user;
            next();
        } catch(error) {
            res.status(401).send({
                errors: "Wrong Token"
            })
        }
    }
}


// module.exports = {
//     signaccesstoken: (User)=> {
//         return new Promise((resolve,reject)=>{
//             const payload = {
//                 email: User.email,
//                 password: User.password
//             }
//             jwt.sign(payload,process.env.SECRET_ACCESS_TOKEN,{
//                 expiresIn:"5s",
//                 issuer: "learningjwt.com"
//                 },(err,token)=>{
//                     if(err) {
//                         console.log(err)
//                         reject(createHttpError.InternalServerError())
//                     }
//                     resolve(token)
//             })
//         })
//     },
//     verifyaccesstoken: (req,res,next) => {
//         const authHeader = req.headers['authorization']
//         const token = authHeader && authHeader.split(' ')[1]
//         if(token == null) {
//             return next(createHttpError.NotAcceptable())
//             }
//         jwt.verify(token,process.env.SECRET_ACCESS_TOKEN,(err,payload) => {
//             if(err) {
//                 const message = err.message === 'JsonWebTokenError' ? 'UnauthorizedError' : err.message
//                 return next(createHttpError.Unauthorized(message))
//                 }
//                 req.user = payload
//                 next()
//         })
//     },
//     signrefreshtoken: (User)=> {
//         return new Promise((resolve,reject)=>{
//             const payload = {
//                 email: User.email,
//                 password: User.password
//             }
//             jwt.sign(payload,process.env.SECRET_REFRESH_TOKEN,{
//                 expiresIn:"1y",
//                 issuer: "learningjwt.com"
//                 },(err,token)=>{
//                     if(err) {
//                         console.log(err)
//                         reject(createHttpError.InternalServerError())
//                     }
//                     resolve(token)
//             })
//         })
//     },verifyrefreshtoken: (refreshtoken) => {
//         return new Promise((resolve,reject)=>{
//             jwt.verify(refreshtoken,process.env.SECRET_REFRESH_TOKEN,(err,payload) => {
//                 if (err) reject(createHttpError.Unauthorized())
//                 user = payload
//                 resolve(user)
        
//         })
//         })
//     }
// }


module.exports = fetchUser;