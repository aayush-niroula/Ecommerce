import express from 'express'
import { addtoCart, getAllCartItems, removeCartItem, updateCartItems } from '../controllers/cart.controller.js'

export const cartRoutes= express.Router()

cartRoutes.post('/:userId/:productId',addtoCart)
cartRoutes.get('/:userId',getAllCartItems)
cartRoutes.put('/:userId/:productId',updateCartItems)
cartRoutes.delete('/:userId/:productId',removeCartItem)