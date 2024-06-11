import {body, validationResult} from 'express-validator';

export const testimonialValidation = [
    body("name", "name must be provided").not().isEmpty(),
    body("testimony", "Please provide your testimony about Isaac's and Fatma's relationship").not().isEmpty(),
];

export const albumValidation = [
    body("name", "name of the album must be provided").not().isEmpty(),
    body('description', 'Please provide a simple discription about the album').not().isEmpty()
];

export const signUpValidations = [

    body("firstName", "First name  is required").not().isEmpty(),
    body("lastName", "Last name  is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const logInValidations = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];
export const otpValidation = [
    body("otp", "Otp must be provided").not().isEmpty(),
];
export const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty(),
];

export const resetPasswordValidation = [
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const storyValidation = [
    body("title", "The story must have a title").not().isEmpty(),
    body("content", "The story must have a content").not().isEmpty()
]
