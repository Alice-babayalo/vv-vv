import express from 'express'
import { addAlbum } from '../controllers/album.controllers.js'


const albumRoute = express.Router();

albumRoute.post('/add', addAlbum)

export default albumRoute