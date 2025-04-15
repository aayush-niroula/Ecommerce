import express from 'express'
import { getUsers, login, signupUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

export const userRoutes = express.Router()

userRoutes.post('/signup',signupUser)
userRoutes.post('/login',login)
userRoutes.get('/',getUsers)