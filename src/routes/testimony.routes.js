import express from 'express';
import { addTestimony, allTestimonies, deleteTestimony, updateTestimony } from '../controllers/testimony.controller.js';
import { testimonialValidation } from '../middleware/validation.js';

const testimonyRoute = express.Router();

testimonyRoute.post('/add', testimonialValidation, addTestimony)
testimonyRoute.get('/All', allTestimonies)
testimonyRoute.delete('/delete/:id', deleteTestimony)
testimonyRoute.patch('/update/:id', testimonialValidation, updateTestimony)

export default testimonyRoute