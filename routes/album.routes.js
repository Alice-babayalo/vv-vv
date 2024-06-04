import express from 'express'
import { addAlbum, allAlbums, deleteAlbum, updateAlbum } from '../controllers/album.controllers.js'
import { albumValidation } from '../middleware/validation.js';

const albumRoute = express.Router();

albumRoute.post('/add', albumValidation, addAlbum)
albumRoute.get('/all', allAlbums)
albumRoute.patch('/update/:id', albumValidation, updateAlbum)
albumRoute.delete('/delete/:id', deleteAlbum)


export default albumRoute