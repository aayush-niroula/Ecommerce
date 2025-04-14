import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) => {
    const token = req.headers['authorization']?.split(" ")[1]
    if(!token){
        return res.status(403).json({ message: "Token is required" });
    }

    try {
      const decoded =jwt.verify(token,process.env.JWT_SECRET)
      req.user=decoded
      next()
    } catch (error) {
        console.log(error);
        
    }
    
}