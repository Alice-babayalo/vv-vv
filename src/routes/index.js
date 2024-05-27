import express from 'express'
import albumRoute from "./album.routes.js";

const routes = express.Router();


routes.use('/album', albumRoute)

export default routes