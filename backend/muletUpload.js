import multer from "multer"


const imageFilter = function(req,file,cb) {
    if(!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|PNG|png|gif|GIF)$/)){
        req.fileValidationError = "Only image files are allowed"
        return cb(new Error('Only image files are allowed'),false)
    }
    cb(null,true)
}

const fileStorageEngine = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,"./image")
    },
    filename : (req,file,cb) =>{
        cb(null,Date.now() + file.originalname.toLowerCase().split(' ').join('-'))
    }
})

const upload = multer({storage : fileStorageEngine,fileFilter : imageFilter})

export default upload