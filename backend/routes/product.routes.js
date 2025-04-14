import { addProduct, deleteProduct, getAllProducts, getMaxOrMinProducts, getProductById,  } from "../controllers/product.controller.js";
import { Router } from "express";
import upload from "../middlewares/multer.js";


export const productRoutes = Router()

productRoutes.post('/add',upload.single('image'),addProduct)
productRoutes.get('/get', getAllProducts);
  
  productRoutes.get('/get/:id',getProductById);
  
  productRoutes.get('/filter',getMaxOrMinProducts);
  productRoutes.delete('/delete',deleteProduct)
  