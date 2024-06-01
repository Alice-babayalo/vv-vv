import express from 'express'
import { addAlbum, allAlbums, deleteAlbum, updateAlbums } from '../controllers/album.controllers.js'
import { albumValidation } from '../middleware/validation.js';

const albumRoute = express.Router();

albumRoute.post('/add', albumValidation, addAlbum)
albumRoute.get('/all', allAlbums)
albumRoute.patch('/update/:id', albumValidation, updateAlbums)
albumRoute.delete('/delete/:id', deleteAlbum)


export default albumRoute