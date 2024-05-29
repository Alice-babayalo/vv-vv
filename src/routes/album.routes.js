import express from 'express'
import { addAlbum, allAlbums, deleteAlbum, updateAlbums } from '../controllers/album.controllers.js'
import { albumValidation } from '../middleware/validation.js';

const albumRoute = express.Router();

albumRoute.post('/add', albumValidation, addAlbum)
albumRoute.get('/all', allAlbums)
albumRoute.patch('/update', albumValidation, updateAlbums)
albumRoute.delete('/delete', deleteAlbum)


export default albumRoute