
import { validationResult } from "express-validator";
import photoModel from "../model/photo.model.js";
import alubumu from "../model/rubumu.model.js";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/index.js";




export const addRubumu = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const album = await alubumu.create(req.body)
    res.status(201).json({ message: "Album created successfully!" })
})

export const deleteRubumu = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const album = await alubumu.findById(id);
	if (!album) {
		return res.status(404).json({ success: false, message: "Album not found" });
	}
	await alubumu.findByIdAndDelete(id);
	const deletedPhotos = await photoModel.deleteMany({ album: id });
	res.status(200).json({
		message: "Album and associated photos deleted successfully!",
		deletedPhotosCount: deletedPhotos.deletedCount,
	});
});

export const allRubumu = asyncWrapper(async (req, res, next) => {
	const albums = await alubumu.find().populate('photos');

        const albumsWithPhotos = albums.map(album => ({
            ...album.toObject(),
            photos: album.photos.map(photo => photo.url)
        }));
        console.log(albumsWithPhotos.photos);
        res.status(200).json({
            success: true,
            number_of_albums: albumsWithPhotos.length,
            allalbums: albumsWithPhotos
        });
});

export const updateRubumu = asyncWrapper(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new BadRequestError(errors.array()[0].msg));
	}

    const { id } = req.params;
    const album = await alubumu.findByIdAndUpdate(id, req.body, { new: true });
    if (!album) {
        return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ message: "album updated  successgfully", album: album });

});

export const getRubumu = asyncWrapper(async (req, res, next) => {
	const { id } = req.params;
	const album = await alubumu.findById(id).populate('photos');
	if (!album) {
		return res.status(404).json({ success: false, message: "Album not found" });
	}
	res.status(200).json({ message: "album found", album: album });
});
