import express from 'express'
import albumRoute from "./album.routes.js";
import photoRoute from './photo.routes.js';
import testimonyRoute from './testimony.routes.js';
import { userRouter } from './user.routes.js';

const routes = express.Router();


routes.use('/album', albumRoute)
routes.use('/photo', photoRoute)
routes.use('/testimony', testimonyRoute)
routes.use('/user', userRouter)

export default routes