import asyncWrapper from "../middleware/async.js";
import albumModel from "../model/album.model.js";
import { BadRequestError } from "../errors/index.js";
import { validationResult } from 'express-validator';
import photoModel from "../model/photo.model.js";


export const addAlbum = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const album = await albumModel.create(req.body)
    res.status(201).json({ message: "Album created successfully!" })
})

export const deleteAlbum = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;
    const album = await albumModel.findById(id);
    if (!album) {
        return res.status(404).json({ success: false, message: "Album not found" });
    }
    await albumModel.findByIdAndDelete(id)
        const deletedPhotos = await photoModel.deleteMany({ album: id });
    res.status(200).json({
        message: "Album and associated photos deleted successfully!",
        deletedPhotosCount: deletedPhotos.deletedCount
    });
});


export const allAlbums = asyncWrapper(async (req, res, next) => {
    const allalbums = await albumModel.find({});
    res.status(200).json({
        number_of_albums: allalbums.length,
        all_albums: allalbums
    })
});

export const updateAlbum = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const album = await albumModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!album) {
        return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ message: "album updated  successgfully", album: album });
});

export const getAlbumById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const album = await albumModel.findById(id);
    if (!album) {
        return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ message: "album found", album: album });
});