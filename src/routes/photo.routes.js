import express from 'express';
import {addPhotos, deletePhoto, getPhotoByAlbumId} from '../controllers/photo.controller.js'
import upload from '../middleware/multer.js';

const photoRoute = express.Router();

photoRoute.post('/add', upload.single('file'), addPhotos)
photoRoute.delete('/delete/:id', deletePhoto)
photoRoute.get('/getphoto/:albumId', getPhotoByAlbumId)

export default photoRoute;