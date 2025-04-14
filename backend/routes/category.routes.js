import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";

export const categoryRoutes = Router()

categoryRoutes.post('/create',createCategory)
categoryRoutes.get("/",getAllCategories)
categoryRoutes.get("/:id",getCategoryById)
categoryRoutes.put("/:id",updateCategory)
categoryRoutes.delete("/:id",deleteCategory)