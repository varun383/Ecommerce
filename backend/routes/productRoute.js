import express from 'express'
const router=express.Router()
import Product from '../models/productModel.js';
// import asyncHandler from '../middleware/asynchandler.js'
// import Product from '../models/productModel.js'
import { getProducts,getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controller/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

// import products from '../data/products.js'
// router.get('/',asyncHandler(async(req,res)=>{
//     const products=await Product.find({})
//     res.json(products)  //data in form of array of object
// }))

// router.get('/:id',asyncHandler(async (req,res)=>{
//     const product=await Product.findById(req.params.id)
//     if(product){
//     return res.json(product)
//     }else{
//         // res.status(404).json({
//         //    message:"product not found"
//         // })
//         res.status(404);
//         throw new Error('resource not found')
//     }
//
router.route('/').get(getProducts).post(protect,admin,createProduct)
router.get('/top',getTopProducts)
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview);

export default router;