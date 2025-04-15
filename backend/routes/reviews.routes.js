import { Router } from "express";
import { createReview, getAllReviews } from "../controllers/reviews.controller.js";

export const reviewRoute = Router()

reviewRoute.post('/user/:userId/product/:productId', createReview);
reviewRoute.get('/:productId',getAllReviews)