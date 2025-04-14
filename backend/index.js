import express from "express";
import dotenv from 'dotenv'
import { userRoutes } from "./routes/user.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import cors from 'cors'
dotenv.config({})
const app= express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.listen(process.env.PORT,()=>{
    console.log("Server is listening at port 8000");
    
})



app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/category',categoryRoutes)