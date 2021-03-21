import express from 'express';

import BlogController from "../controller/BlogPostController";

import{VerifyAuth} from '../Middleware/AuthVerification';

const router=express.Router();

router.post("/post", VerifyAuth,BlogController.articles);

router.get("/all",VerifyAuth, BlogController.getAllBlogs);

router.get("/one/:id", VerifyAuth,BlogController.getOneBlog);

router.delete("/one/:id",VerifyAuth, BlogController.deleteOneBlog);

router.patch("/one/:id",VerifyAuth, BlogController.UpdateOneBlog);
export default router;