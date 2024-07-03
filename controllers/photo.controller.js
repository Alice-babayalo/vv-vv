import asyncWrapper from "../middleware/async.js";
import cloudinary from "../middleware/cloudinary.js";
import albumModel from "../model/album.model.js";
import alubumu from "../model/rubumu.model.js"
import photoModel from "../model/photo.model.js";

export const addPhotos = asyncWrapper(async (req, res, next) => {
    const {albumId} = req.params;

    if (!albumId) {
        return res.status(400).json({
            success: false,
            message: "Album ID is required."
        });
    }
    const album = await alubumu.findById(albumId);
    if(!album){
        return res.status(404).json({
            success: false,
            message: "Album not found"
        });
    }

    const images = req.files;
    console.log(images);

    const results = [];
    for (const image of images){
        const imageResult = await cloudinary.uploader.upload(image.path, {
            resource_type: "auto"
        });

        results.push(imageResult)
    }
        const photos = results.map(result => ({
            url: result.secure_url,
            album: albumId
        }));
        await photoModel.create(photos)
        res.status(200).json({ message: "Photos added successfully!", photos: photos });
});

export const deletePhoto = asyncWrapper( async (req, res, next)=>{
    const photo = await photoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:"photo deleted",
        photo
    })
})

export const updatePhoto = asyncWrapper ( async (req, res, next) => {
    const photoId = await photoModel.findById(req.params.id);
    if(!photoId){
        return res.status(404).json({message: "Photo not found"})
    }
    const albumId = req.body.album;
    const validAlbum = await alubumu.findById(albumId);
    if(!validAlbum){
        return res.status(404).json({message: "album not found"})
    }

    const photo = await photoModel.findByIdAndUpdate(photoId, req.body, {new: true})

    res.status(200).json({
        message: "Photo album updated successfully!",
        Photo: photo
    })
})

export const replacePhoto = asyncWrapper ( async (req, res, next) => {
    const { id } = req.params;
    const photo = await photoModel.findById(id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    const image = req.file;

    if (!image) {
        return res.status(400).json({ message: 'No image files provided' });
    }
    const PhotoUrl = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto"
    });
    photo.url = PhotoUrl.secure_url;
    await photo.save();
    return res.status(200).json({ message: 'Photo replaced successfully', photo });
});


export const getPhotoByAlbumId = asyncWrapper (async (req, res, next) =>{
    const {albumId} = req.params;
    const findAlbum = await alubumu.findById(albumId)
    if (!findAlbum){
        return res.status(404).json({
            message:"Photos not found"
        })
    }
    const photo = await photoModel.find({album: albumId});
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