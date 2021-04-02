import express from 'express';

import BlogController from "../controller/BlogPostController";

import{VerifyAuth} from '../Middleware/AuthVerification';

import Validator from '../Middleware/validator'

const router=express.Router();

router.post("/post", VerifyAuth,BlogController.articles);

router.get("/all",VerifyAuth, BlogController.getAllBlogs);

router.get("/one/:id", VerifyAuth,Validator.VerifyAccess,Validator.ValidateInput,BlogController.getOneBlog);

router.delete("/one/:id",VerifyAuth,Validator.VerifyAccess,Validator.ValidateInput, BlogController.deleteOneBlog);

router.patch("/one/:id",VerifyAuth,Validator.VerifyAccess,Validator.ValidateInput, BlogController.UpdateOneBlog);
export default router;