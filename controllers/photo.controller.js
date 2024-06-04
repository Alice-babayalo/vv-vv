import asyncWrapper from "../middleware/async.js";
import cloudinary from "../middleware/cloudinary.js";
import photoModel from "../model/photo.model.js";

export const addPhotos = asyncWrapper(async (req, res, next) => {
    const {albumId} = req.params;

    if (!albumId) {
        return res.status(400).json({
            success: false,
            message: "Album ID is required."
        });
    }

   const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));

    try {
        const results = await Promise.all(uploadPromises);

        console.log("Cloudinary Upload Results:", results);

        const photos = results.map(result => ({
            url: result.url,
            album: albumId
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


export const getPhotoByAlbumId = asyncWrapper (async (req, res, next) =>{
    const {albumId} = req.params;
    const photo = await photoModel.find({album: albumId});
    if (!photo){
        return res.status(404).json({
            message:"Photos not found"
        })
    }
    res.status(200).json({
        message: "Photos retrieved successfully",
        numberOfPhotos: photo.length,
        photo
    })
})

export const allPhotos = asyncWrapper (async(req,res, next) => {
    const photos = await photoModel.find({});
    res.status(200).json({
        message: "All photos retrieved successfully",
        numberOfPhotos: photos.length,
        photos
    })
})