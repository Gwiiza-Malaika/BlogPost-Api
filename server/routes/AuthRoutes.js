import express from 'express';
import UserController from '../controller/AuthController';

const router= express.Router();
router.post('/auth/signup', UserController.UserController.signup);
router.post('/auth/signin', UserController.UserController.signin);


export default router;