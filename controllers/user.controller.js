import userModel from "../model/user.model.js";
import asyncWrapper from "../middleware/async.js";
import bcryptjs from 'bcryptjs';
import { BadRequestError } from "../errors/index.js";
import { validationResult } from "express-validator";
import { sendEmail } from "../utils/sendEmail.js";
import { otpGenerator } from "../utils/otp.js";
import { UnauthorizedError } from "../errors/unauthorisedError.js";
import jwt from "jsonwebtoken";
import TokenModel from '../model/Auth.Token.model.js';
import dotenv from 'dotenv'

dotenv.config(); 

export const SignUp = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Checking if the user is already in using the email
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (foundUser) {
        return next(new BadRequestError("Email already in use"));
    };

    // Harshing the user password
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

    // Generating OTP
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime() + (60 * 1000 * 5);

    // Recording the user to the database
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        otpExpires: otpExpirationDate,
        otp: otp
    });

    const savedUser = await newUser.save();
    // console.log(savedUser);

    await sendEmail(req.body.email, "Verify your account", `Your OTP is ${otp}`);

    if (savedUser) {
        return res.status(201).json({
            message: "User account created!",
            user: savedUser
        });
    }
});

export const ValidateOpt = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Checking if the given opt is stored in our database
    const foundUser = await userModel.findOne({ otp: req.body.otp });
    if (!foundUser) {
        next(new UnauthorizedError('Authorization denied'));
    };

    // Checking if the otp is expired or not.
    if (foundUser.otpExpires < new Date().getTime()) {
        next(new UnauthorizedError('OTP expired'));
    }

    // Updating the user to verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();

    if (savedUser) {
        return res.status(201).json({
            message: "User account verified!",
            user: savedUser
        });
    }
});

export const logIn = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Find user
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) {
        return next(new BadRequestError("Invalid email or password!"));
    };

    // Check account verification
    // if (!foundUser.verified) {
    //     return next(new BadRequestError("Your account is not verified!"));
    // }

    // Verify password
    const isPasswordVerfied = await bcryptjs.compareSync(req.body.password, foundUser.password);
    if (!isPasswordVerfied) {
        return next(new BadRequestError("Invalid email or password!"));
    }

    // Generate token
    const token = jwt.sign({ id: foundUser.id, email: foundUser.email, role: foundUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    const newToken = new TokenModel({
        token: token,
        user: foundUser._id,
        role: foundUser.role,
        expirationDate: expirationDate,
    });
    
    await newToken.save();
    await TokenModel.deleteMany({ expirationDate: { $lt: new Date() } });

    res.status(200).json({
        message: "User logged in!",
        token: token,
        user: foundUser
    });
});

export const ForgotPassword = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    // Find user
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) {
        return next(new BadRequestError("Your email is not registered!"));
    };

    // Generate token
    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Recording the token to the database
    await TokenModel.create({
        token: token,
        user: foundUser._id,
        expirationDate: new Date().getTime() + (60 * 1000 * 5),
    });

    const link = `http://localhost:10000/reset-password?token=${token}&id=${foundUser.id}`;
    const emailBody = `Click on the link bellow to reset your password\n\n${link}`;

    await sendEmail(req.body.email, "Reset your password", emailBody);

    res.status(200).json({
        message: "We sent you a reset password link on your email!",
    });
});

export const ResetPassword = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };

    // Verify token
    const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(new BadRequestError("Invalid token!"));
    }

    const recordedToken = await TokenModel.findOne({ token: req.body.token });
    
    if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
        return next(new BadRequestError("Invalid token!"));
    }

    if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
        return next(new BadRequestError("Token expired!"));
    }

    // Find user
    const foundUser = await userModel.findById(req.body.id);
    if (!foundUser) {
        return next(new BadRequestError("User not found!"));
    };

    // Deleting the user token
    await TokenModel.deleteOne({ token: req.body.token });

    // Harshing the user password
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

    // Updating the user password
    foundUser.password = hashedPassword;

    const savedUser = await foundUser.save();
    if (savedUser) {
        return res.status(200).json({
            message: "Your password has been reset!",
        })
    }
});

export const logout = asyncWrapper(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  });