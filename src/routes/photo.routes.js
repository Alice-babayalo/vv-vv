import express from 'express';
import {addPhotos, deletePhoto, getPhotoByAlbumId} from '../src/controllers/photo.controller.js'
import upload from '../src/middleware/multer.js.js';

const photoRoute = express.Router();

photoRoute.post('/add', upload.array('files', 30), addPhotos);
photoRoute.delete('/delete/:id', deletePhoto)
photoRoute.get('/getphoto/:albumId', getPhotoByAlbumId)

export default photoRoute;