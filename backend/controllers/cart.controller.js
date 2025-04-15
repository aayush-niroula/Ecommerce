import { prisma } from "../db/dbConnect.js";



export const addtoCart =async(req,res)=>{
const {userId,productId}= req.params;
const {quantity}= req.body;
try {
const existingItem = await prisma.cartItem.findUnique({
    where:{
        userId_productId:{
            userId:parseInt(userId),
            productId:parseInt(productId)
        }
    }
})
if(existingItem){
    const updateItem = await prisma.cartItem.update({
        where:{
            userId_productId:{
                userId:parseInt(userId),
                productId:parseInt(productId)
            }
        },
        data:{
            quantity: existingItem.quantity=quantity
        },
        include:{
            product:true
        }
    })
    return res.json(updateItem)
}
const newItem= await prisma.cartItem.create({
    data:{
        userId:parseInt(userId),
        productId:parseInt(productId),
        quantity
    },
    include:{
        product:true
    }
})
console.log("New cart Item Added",newItem);

return res.status(200).json({
    messaage:"Cart added successfully",
    newItem
})
} catch (error) {
    console.log(error);
    
}
}

export const getAllCartItems= async (req,res) => {
    const {userId}= req.params;
    try {
   const cartItem= await prisma.cartItem.findMany({
        where:{
            userId:parseInt(userId)
        },
        include:{
            product:true,
            user:true
        }
    })
    res.status(200).json({
        messaage:"All cart items fetched",
        cartItem
    })
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const updateCartItems= async (req,res) => {
    const { userId,productId} =req.params;
    const {quantity}=req.body;

    try {
     const updatedItem= await prisma.cartItem.update({
            where:{
                userId_productId:{
                    userId:parseInt(userId),
                    productId:parseInt(productId)
                },
            
            },
            data:{
                quantity
            }
        })
        return res.status(200).json({
            messaage:"Items updated successfully",
            updatedItem

        })
    } catch (error) {
        console.log(error);
        
    }
}
export const removeCartItem = async (req, res) => {
    const { userId, productId } = req.params;
  
    try {
      await prisma.cartItem.delete({
        where: {
          userId_productId: {
            userId:parseInt(userId),
            productId:parseInt(productId)
          }
        }
      })
  
      res.status(200).json({ message: 'Item removed from cart' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error removing cart item' })
    }
  }