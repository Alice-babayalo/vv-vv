import express from "express";
import {
	addAlbum,
	allAlbums,
	deleteAlbum,
	updateAlbum,
} from "../controllers/album.controllers.js";
import { albumValidation } from "../utils/validation.js";
import authMiddleware from "../middleware/authorisation.js";
import upload from "../middleware/multer.js";

const albumRoute = express.Router();

albumRoute.post(
	"/add",
	authMiddleware,
	upload.array("photos", 3),
	albumValidation,
	addAlbum
);

albumRoute.get("/all", allAlbums);
albumRoute.patch(
	"/update/:id",
	authMiddleware,
	upload.array("photos", 3),
	// albumValidation,
	updateAlbum
);
albumRoute.delete("/delete/:id", authMiddleware, deleteAlbum);

export default albumRoute;
