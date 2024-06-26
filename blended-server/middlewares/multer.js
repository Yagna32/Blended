const multer = require('multer')

// Image Storage Engine

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${file.originalname.split('.')[0]}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

// const upload = multer({storage:storage})


const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits : {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

module.exports = upload