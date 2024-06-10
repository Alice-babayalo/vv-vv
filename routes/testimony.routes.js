import express from 'express';
import { addTestimony, allTestimonies, deleteTestimony, updateTestimony } from '../controllers/testimony.controller.js';
import { testimonialValidation } from '../middleware/validation.js';
import authMiddleware from '../middleware/authorisation.js';

const testimonyRoute = express.Router();

testimonyRoute.use(authMiddleware)
testimonyRoute.post('/add', testimonialValidation, addTestimony)
testimonyRoute.get('/All', allTestimonies)
testimonyRoute.delete('/delete/:id', authMiddleware, deleteTestimony)
testimonyRoute.patch('/update/:id', authMiddleware, testimonialValidation, updateTestimony)

export default testimonyRoute