import express from 'express'
import { addAlbum, allAlbums, deleteAlbum, updateAlbum } from '../controllers/album.controllers.js'
import { albumValidation } from '../middleware/validation.js';
import authMiddleware from '../middleware/authorisation.js';
import isAdmin from '../middleware/isAdmin.middleware.js';

const albumRoute = express.Router();

albumRoute.post('/add', authMiddleware, albumValidation, addAlbum)
albumRoute.get('/all', allAlbums)
albumRoute.patch('/update/:id', authMiddleware, albumValidation, updateAlbum)
albumRoute.delete('/delete/:id', authMiddleware, deleteAlbum)


export default albumRoute