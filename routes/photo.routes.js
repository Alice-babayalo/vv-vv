import express from 'express';
import {addPhotos, allPhotos, deletePhoto, getPhotoByAlbumId} from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/authorisation.js';

const photoRoute = express.Router();


photoRoute.post('/add/:albumId', authMiddleware, upload.array('images'), addPhotos);
photoRoute.delete('/delete/:id', authMiddleware, deletePhoto)
photoRoute.get('/getphoto/:albumId', getPhotoByAlbumId)
photoRoute.get('/all', allPhotos)

export default photoRoute;