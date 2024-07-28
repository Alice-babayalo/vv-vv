import express from 'express';
import { SignUp, logIn, ValidateOpt, ResetPassword, logout, ForgotPassword, changePassword} from '../controllers/user.controller.js';
import { signUpValidations, logInValidations, otpValidation, resetPasswordValidation, forgotPasswordValidation } from '../utils/validation.js';


export const userRouter = express.Router();

userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/login', logInValidations, logIn);
userRouter.post('/verify', otpValidation, ValidateOpt);
userRouter.post('/forgotPassword', forgotPasswordValidation, ForgotPassword);
userRouter.post('/resetPassword/:resetToken', resetPasswordValidation, ResetPassword);
userRouter.get('/logout', logout);
userRouter.post('/changePassword/:id', changePassword);

