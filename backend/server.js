import path from 'path'
import express from 'express' //es6
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config()  
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoute.js'
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/uploadRoute.js'


// v file function is a method provided by the dotenv package in Node.js. This method loads the variables from your .eninto the process.env object, making them accessible within your Node.js application.

const port=process.env.PORT || 5000;

connectDB()  //connection to mongo db

const app=express()
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Cookie parser middleWare
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("API is running")
})

app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

const __dirname=path.resolve() //Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.use(notFound);
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})
