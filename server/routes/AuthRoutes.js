import express from 'express';
import UserController from '../controller/AuthController';
import Validator from '../Middleware/validator'

const router= express.Router();
router.post('/auth/signup', Validator.newAccountRule(),Validator.ValidateInput,UserController.UserController.signup);
router.post('/auth/signin', Validator.newSigninRule(),Validator.ValidateInput,UserController.UserController.signin);


export default router;