import { validationResult } from "express-validator";
import albumModel from "../model/album.model.js";
import photoModel from "../model/photo.model.js";
import cloudinary from "../middleware/cloudinary.js";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/index.js";

export const addAlbum = asyncWrapper(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new BadRequestError(errors.array()[0].msg));
	}

	const uploader = async (path) => await cloudinary.uploader.upload(path);

	const urls = [];
	const files = req.files;
	for (const file of files) {
		const { path } = file;
		const newPath = await uploader(path);
		urls.push(newPath.url);
	}

	const albumData = {
		name: req.body.name,
		description: req.body.description,
		photos: urls,
	};

	const album = await albumModel.create(albumData);
	res.status(201).json({ message: "Album created successfully!", album });
});

// Other functions remain unchanged

export const deleteAlbum = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const album = await albumModel.findById(id);
	if (!album) {
		return res.status(404).json({ success: false, message: "Album not found" });
	}
	await albumModel.findByIdAndDelete(id);
	const deletedPhotos = await photoModel.deleteMany({ album: id });
	res.status(200).json({
		message: "Album and associated photos deleted successfully!",
		deletedPhotosCount: deletedPhotos.deletedCount,
	});
});

export const allAlbums = asyncWrapper(async (req, res, next) => {
	const allalbums = await albumModel.find({});
	res.status(200).json({
		number_of_albums: allalbums.length,
		all_albums: allalbums,
	});
});

export const updateAlbum = asyncWrapper(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new BadRequestError(errors.array()[0].msg));
	}

	const { id } = req.params;

	// Check if the album exists
	const album = await albumModel.findById(id);
	if (!album) {
		return res.status(404).json({ success: false, message: "Album not found" });
	}

	// Prepare the update data
	const updateData = {};
	if (req.body.name) updateData.name = req.body.name;
	if (req.body.description) updateData.description = req.body.description;

	// Handle file uploads if present
	if (req.files && req.files.length > 0) {
		const uploader = async (path) => await cloudinary.uploader.upload(path);
		const urls = [];
		for (const file of req.files) {
			const { path } = file;
			const newPath = await uploader(path);
			urls.push(newPath.url);
		}
		updateData.photos = urls;
	}

	// Update the album
	const updatedAlbum = await albumModel.findByIdAndUpdate(id, updateData, {
		new: true,
	});
	res
		.status(200)
		.json({ message: "Album updated successfully", album: updatedAlbum });
});

export const getAlbumById = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const album = await albumModel.findById(id);
	if (!album) {
		return res.status(404).json({ success: false, message: "Album not found" });
	}
	res.status(200).json({ message: "album found", album: album });
});
