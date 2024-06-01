import asyncWrapper from "../middleware/async.js";
import albumModel from "../model/album.model.js";
import {BadRequestError}  from "../errors/index.js";
import { validationResult } from 'express-validator';
import photoModel from "../model/photo.model.js";


export const addAlbum = asyncWrapper (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const album = await albumModel.create(req.body)
    res.status(200).json({message:"Album created successfully!"})
})

export const deleteAlbum = asyncWrapper(async (req, res, next) => {

    const album = await albumModel.findByIdAndDelete(req.params.id)
    
    if (!album) {
        res.status(404).json({ message: "album not found" });
    }
    const deletedPhotos = await photoModel.deleteMany({ album: album._id });

    res.status(200).json({
        message: "Album and associated photos deleted successfully!",
        deletedPhotosCount: deletedPhotos.deletedCount
    });});


export const allAlbums = asyncWrapper(async (req, res, next) => {
    const allalbums = await hospitalModel.find({});
    res.status(200).json({
        number_of_albums: allalbums.length,
        all_albums: allalbums
    })
});

export const updateAlbums = asyncWrapper(async (req, res, next) => {
    const album = await albumModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!album) {
        res.status(404).json({ message: "album not found" });
    }
    res.status(200).json({ message: "album updated successfully!" , album: album });
})