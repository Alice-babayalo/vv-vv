import express from 'express';
import {addPhotos, allPhotos, deletePhoto, getPhotoByAlbumId, updatePhoto, replacePhoto} from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/authorisation.js';

const photoRoute = express.Router();


photoRoute.post('/add/:albumId', authMiddleware, upload.array('images'), addPhotos);
photoRoute.delete('/delete/:id', authMiddleware, deletePhoto)
photoRoute.get('/getphoto/:albumId', getPhotoByAlbumId)
photoRoute.get('/all', allPhotos)
photoRoute.patch('/replace/:id', authMiddleware, upload.single('image'), replacePhoto);
photoRoute.patch('/update/:id', authMiddleware, updatePhoto);

export default photoRoute;