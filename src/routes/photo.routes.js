import express from 'express';
import { addPhoto } from "../controllers/photo.controllers.js";

const photoRoute = express.Router();

photoRoute.post('/add', addPhoto);

export default photoRoute;