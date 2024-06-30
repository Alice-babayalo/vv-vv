import { body, validationResult } from "express-validator";

// Validation for testimonial
export const testimonialValidation = [
	body("name", "Name must be provided").not().isEmpty(),
	body(
		"testimony",
		"Please provide your testimony about Isaac's and Fatma's relationship"
	)
		.not()
		.isEmpty(),
];

// Validation for album
export const albumValidation = [
	body("name", "Name of the album must be provided").not().isEmpty(),
	// body("photos").custom((value, { req }) => {
	// 	if (!req.files || req.files.length !== 3) {
	// 		throw new Error("Please upload 3 images per album");
	// 	}
	// 	return true;
	// }),
];

// Validation for sign up
export const signUpValidations = [
	body("firstName", "First name is required").not().isEmpty(),
	body("lastName", "Last name is required").not().isEmpty(),
	body("email", "Email is required").not().isEmpty(),
	body("email", "Invalid email").isEmail(),
	body("password", "Password is required").not().isEmpty(),
	body(
		"password",
		"Password should contain at least 8 characters, uppercase and lowercase letters, numbers, and symbols"
	).isStrongPassword(),
];

// Validation for log in
export const logInValidations = [
	body("email", "Email is required").not().isEmpty(),
	body("email", "Invalid email").isEmail(),
	body("password", "Password is required").not().isEmpty(),
	body("password", "Invalid password").isStrongPassword(),
];

// Validation for OTP
export const otpValidation = [
	body("otp", "OTP must be provided").not().isEmpty(),
];

// Validation for forgot password
export const forgotPasswordValidation = [
	body("email", "Email must be provided").not().isEmpty(),
];

// Validation for reset password
export const resetPasswordValidation = [
	body("password", "Password is required").not().isEmpty(),
	body(
		"password",
		"Password should contain at least 8 characters, uppercase and lowercase letters, numbers, and symbols"
	).isStrongPassword(),
];

// Validation for story
export const storyValidation = [
	body("title", "The story must have a title").not().isEmpty(),
	body("content", "The story must have content").not().isEmpty(),
];
