import express from 'express'
import albumRoute from "./album.routes.js";
import photoRoute from './photo.routes.js';

const routes = express.Router();


routes.use('/album', albumRoute)
routes.use('/photo', photoRoute)

export default routes