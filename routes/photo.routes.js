import express from 'express';
import {addPhotos, allPhotos, deletePhoto, getPhotoByAlbumId} from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/authorisation.js';

const photoRoute = express.Router();

photoRoute.use(authMiddleware)
photoRoute.post('/add/:albumId', upload.array('files', 30), addPhotos);
photoRoute.delete('/delete/:id', deletePhoto)
photoRoute.get('/getphoto/:albumId', getPhotoByAlbumId)
photoRoute.get('/all', allPhotos)

export default photoRoute;