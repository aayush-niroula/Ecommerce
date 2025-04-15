import { prisma } from "../db/dbConnect.js";

export const createReview =async(req,res)=>{
   try {
    const {userId,productId}= req.params;
    const { comment,rating}=req.body;
    if(!comment || !rating){
        return res.status(402).json({
            message:"Please provide comment and rating "
        })
    }
    if(rating<1 || rating >5){
        return res.status(400).json({
            message:"Rating should between  1 and 5"
        })
    }
    

    const review = await prisma.review.create({
        data:{
            comment,
            rating,
               userId:parseInt(userId),
              productId:parseInt(productId)
        }
    })
    return res.status(200).json({
        messsage:"Review added successfully",
        review
    })
   } catch (error) {
    console.log(error);
    
   }
}

export const getAllReviews =async (req,res) => {
    const {productId}= req.params
    try {
        const reviews=await prisma.review.findMany({
       where:{
       productId:parseInt(productId)
       },
          orderBy:{
            createdAt:"desc"
          },
          include:{
        user:true,
        product:true
         }
        })
        return res.status(200).json({
            message:"Reviews fetched successfully",
            reviews
            
        })

    } catch (error) {
        console.log(error);
        
    }
}


