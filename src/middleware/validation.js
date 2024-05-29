import {body, validationResult} from 'express-validator';

export const testimonialValidation = [
    body("name", "name must be provided").not().isEmpty(),
    body("testimony", "Please provide your testimony about Isaac's and Fatma's relationship").not().isEmpty(),
];

export const albumValidation = [
    body("name", "name of the album must be provided").not().isEmpty(),
    body('description', 'Please provide a simple discription about the album').not().isEmpty()
]