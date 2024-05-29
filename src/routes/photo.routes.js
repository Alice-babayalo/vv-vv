import express from 'express';
import addPhoto from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';
const photoRoute = express.Router();

photoRoute.post('/add', upload.single('file'), addPhoto)

export default photoRoute;