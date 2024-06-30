import express from "express";
import {
	addAlbum,
	allAlbums,
	deleteAlbum,
	updateAlbum,
	getAlbumById
} from "../controllers/album.controllers.js";
import { albumValidation } from "../utils/validation.js";
import authMiddleware from "../middleware/authorisation.js";
import upload from "../middleware/multer.js";

const albumRoute = express.Router();

albumRoute.post(
	"/addAlbumWithPhotos",
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
albumRoute.get("/getOneAlbum/:id", getAlbumById)

export default albumRoute;
