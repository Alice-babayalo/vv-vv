import { BadRequestError } from "../errors";
import asyncWrapper from "../middleware/async";
import albumModel from "../model/album.model";
import { BadRequestError } from "../errors/index.js";
import { validationResult } from 'express-validator';


export const addAlbum = asyncWrapper (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const album = await albumModel.create(req.body)
})

export const deleteAlbum = asyncWrapper(async (req, res, next) => {
    const album = await albumModel.findByIdAndDelete(req.params.id)
    if (!album) {
        res.status(404).json({ message: "album not found" });
    }
    res.status(200).json({ message: "album deleted successfully!" });
});


export const allAlbums = asyncWrapper(async (req, res, next) => {
    const allalbums = await hospitalModel.find({});
    res.status(200).json({
        number_of_albums: allalbums.length,
        all_albums: allalbums
    })
});