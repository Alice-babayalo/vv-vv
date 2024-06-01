import express from 'express';
import {addPhotos} from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';

const photoRoute = express.Router();

photoRoute.post('/add', upload.single('file'), addPhotos)

export default photoRoute;