import path from 'path'
import express from 'express'
import multer from 'multer'
const router=express.Router()

// muletr library to handle file uploads

const storage=multer.diskStorage({
    destination(req,file,cb){
       cb(null,'/uplaods')
    },
    filename(req,file,cb){
        //this property how the uploaded file names,it uses the original field name,current time stamp,file extension
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) ;//
    },
}); //Returns a StorageEngine implementation configured to store files on the local file system.


// checkFileType is a function that checks whether the uploaded file has a valid extension and mimetype.
function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

//The function compares the file extension and mimetype of the uploaded file against the defined filetypes.
if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: 'Images only!' });
  }
}

const upload=multer({
    storage,
})
// upload.single('image') is the middlware for single image upload
router.post('/', upload.single('image'), (req, res) => {
    res.send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });

export default router;
