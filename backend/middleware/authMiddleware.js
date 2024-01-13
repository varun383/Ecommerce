import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config()  


//protect route
 const protect=asyncHandler(async(req,res,next)=>{
let token;
// read jwt from cookie
token=req.cookies.jwt;
if(token){
   try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.userId).select('-password')
    next()
   }catch(error){
    console.log(error);
    res.status(404);
    throw new Error("not authorized")
   }
}else{
    res.status(404);
    throw new Error("not authorized,no token")
}

})

//Admin middleware
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
       next();
    }else{
        res.status(404);
        throw new Error("not authorized,no token")
    }
    }

export {protect,admin}
