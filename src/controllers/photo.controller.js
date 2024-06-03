import asyncWrapper from "../../middleware/async.js";
import cloudinary from "../../middleware/cloudinary.js";
import photoModel from "../../model/photo.model.js";

export const addPhotos = asyncWrapper(async (req, res, next) => {
    const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
    );

        const results = await Promise.all(uploadPromises);

        const photos = results.map(result => ({
            url: result.url,
            album: req.body.album
        }));

        const createdPhotos = await photoModel.insertMany(photos);

        res.status(200).json({ message: "Photos added successfully!", photos: createdPhotos });
});

export const deletePhoto = asyncWrapper( async (req, res, next)=>{
    const photo = await photoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"photo deleted",
        photo
    })
})


export const getPhotoByAlbumId = asyncWrapper (async (req, res, next) =>{
    const photo = await photoModel.find({album: req.params.albumId});
    if (!photo){
        return res.status(404).json({
            message:"Photos not found"
        })
    }
    res.status.json({
        message: "Photos retrieved successfully",
        photo
    })
})