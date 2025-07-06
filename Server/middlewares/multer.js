import multer from 'multer';

//creating multer middleware for parsing multipart/form-data

const storage = multer.diskStorage({
  filename:function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
}) 


const upload  = multer({
    storage
})

export default upload;
