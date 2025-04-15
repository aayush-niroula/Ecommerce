import { prisma } from "../db/dbConnect.js";
import cloudinary from "../middlewares/cloudinary.js";

export const addProduct =async(req,res)=>{
    try 
    {
    const { name,description,price, stock,categoryId,brand}= req.body;

    if(!name || !description || !price || !categoryId ){
        return res.status(400).json({
            message:"Please provide all details"
        })
    }
    let imageUrl =""
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"ecommerce-products"
        });
        imageUrl= result.secure_url;
    }

const product= await prisma.product.create({
    data:{
        name,
        imageUrl,
        price:parseFloat(price),
        stock:parseInt(stock),
        description,
        category:{
          connect:{
            id:parseInt(categoryId)
          }
        },
        brand
    }
 })
 return res.status(201).json({
    message: "Product added successfully",
    product
  });

        
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllProducts = async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          reviews: true,
          wishlist: true,
          cartItems: true,
          orderItems: true
        }
      });
  
      return res.status(200).json({
        message: "Products fetched successfully",
        products
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({
        message: "Error fetching products",
        error: error.message
      });
    }
  };

// Get product by ID
export const getProductById = async (req,res) => {
    const {id} = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id:parseInt(id)},
            include: {
                category: true,
                reviews: true,
                cartItems: true,
                orderItems: true,
                wishlist: true,
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        return res.status(200).json({
            product
        })
    } catch (error) {
        throw new Error("Error fetching product by ID: " + error.message);
    }
};

// Get products filtered by price range
export const getMaxOrMinProducts = async (req, res) => {
    try {
      const minPrice = req.query.min;
      const maxPrice = req.query.max;
  
      const products = await prisma.product.findMany({
        where: {
          price: {
            gte: minPrice ? parseFloat(minPrice) : 0,
            lte: maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER,
          }
        },
        orderBy: {
          price: "asc",
        },
        include: {
          category: true,
          reviews: true,
          cartItems: true,
          orderItems: true,
          wishlist: true,
        }
      });
  
      return res.status(200).json({
        message: "Filtered products fetched successfully",
        products,
      });
  
    } catch (error) {
      console.error("Error fetching filtered products:", error.message);
      return res.status(500).json({
        message: "Error fetching filtered products",
        error: error.message,
      });
    }
  };

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
};