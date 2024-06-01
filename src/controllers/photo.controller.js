import asyncWrapper from "../middleware/async.js";
import cloudinary from "../middleware/cloudinary.js";
import photoModel from "../model/photo.model.js";

export const addPhotos = asyncWrapper(async (req, res, next) => {
    const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
    );

    try {
        const results = await Promise.all(uploadPromises);

        const photos = results.map(result => ({
            url: result.url,
            album: req.body.album
        }));

        const createdPhotos = await photoModel.insertMany(photos);

        res.status(200).json({ message: "Photos added successfully!", photos: createdPhotos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading photos" });
    }
});

export const deletePhoto = asyncWrapper( async (req, res, next)=>{
    const photo = await photoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"photo deleted",
        photo
    })
})
