const express = require("express");
const router = express.Router()
const {verifyToken }=require('../controller/userControllers')
const {postLogin,postRegister,getProducts,deleteProduct,updateProduct,customerLogin,customerRegister} = require('../controller/userControllers')
const productControllers=require('../controller/productControllers')
const multer =require("multer")
const path =require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
           cb(null, "Uploads");
       },
        filename: (req, file, cb) => {
            cb(null, "image-" + Date.now() + path.extname(file.originalname));
        },
    });
   const fileFilter = (req, file, cb) => {
       if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
           cb(null, true);
       } else {
           cb(null, false);
       }
   };
   const fileUpload = multer({
       storage: storage,
       fileFilter: fileFilter,
   });


router.post('/login',postLogin)
router.post('/register',postRegister)

router.post('/logins',customerLogin)
router.post('/registers',customerRegister)
router.post('/product',getProducts,verifyToken)
router.get('/product',getProducts)
router.post(
    "/add",
    fileUpload.single("image"),
   productControllers.createProduct,verifyToken
);
router.delete('/:id', deleteProduct,verifyToken)
router.put('/:id', updateProduct,verifyToken)



module.exports = router