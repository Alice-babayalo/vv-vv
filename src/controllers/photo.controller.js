import asyncWrapper from "../middleware/async.js";
import cloudinary from "../middleware/cloudinary.js"
import photoModel from "../model/photo.model.js";


const addPhoto = asyncWrapper(async (req, res, next) => {
    const result = await cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log(err.message)
            return res.status(500).json({ message: "error" })
        }
    })
    const newphoto = new photoModel({
        url: result.url,
        description: req.body.description,
        album: req.body.album
    })
    newphoto.save()
    res.status(200).json({message:"Photo added successfully!"});
})

export default addPhoto;