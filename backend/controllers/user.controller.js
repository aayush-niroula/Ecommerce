import {prisma} from '../db/dbConnect.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const findUser = await prisma.user.findFirst({
      where: { email },
    });

    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);


   
    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
  

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
       
      },
     
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

    
    export const login = async (req, res) => {
    
        try {
        const { email,password}= req.body;
       
        if(!email || !password){
            return res.status(400).json({
                message:"Email and password is required"
            })
        }

       const findUser= await prisma.user.findFirst({
        where:{email}
       })
       if(!findUser){
        return res.status(400).json({message:"User not found"})
       }

       const isPasswordValid = await bcrypt.compare(password,findUser.password)

       if(!isPasswordValid){
        return res.status(401).json({message:"Incorrect password"})
       }

       const token = jwt.sign(
        { id: findUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
       
  
       return res.status(200).json({
        message:"Login Successful",
        token,
        data:{
            id:findUser.id,
            email:findUser.email,
            name:findUser.name
        }
       })
            
        } catch (error) {
            console.log(error);
            
        }
    }
    export const getUsers=async (req,res) => {
       try {
        const users=await prisma.user.findMany({
          orderBy:{
            createdAt:"desc"
          },
          include:{
            reviews:true
          }
        })
        return res.status(200).json({
          message:"User fetched successfully",
          users
        })
       } catch (error) {
        console.log(error);
        
       }
    }
    
    export const deleteUser = async (req, res) => {
        try {
          const { userId } = req.user; // Extract user ID from the decoded token
      
          // Check if the user exists in the database
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });
      
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Delete the user from the database
          await prisma.user.delete({
            where: { id: userId },
          });
      
          res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Delete user error:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      };