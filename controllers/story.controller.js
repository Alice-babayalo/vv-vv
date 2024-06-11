import cloudinary from 'cloudinary';
import storyModel from "../model/story.model.js";
import asyncWrapper from "../middleware/async.js";
import { BadRequestError } from "../errors/badRequest.js";
import { validationResult } from "express-validator";


export const addStory = asyncWrapper( async( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const result = await cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "error in uploading file" })
        }
    })

    const story = new storyModel({
        title: req.body.title,
        subTitle: req.body.subtitle,
        content: req.body.content,
        story_photo_url: result.secure_url
    })

    story.save();

    res.status(201).json({
        message: "Story created successfully!",
        story: story
    })
})

export const deleteStory = asyncWrapper (async (req, res, next) => {
    const storyId = req.params.id;
    const findId = await storyModel.findById(storyId);
    if (!findId) {
        return res.status(404).json({
            message: "Story not found"
        });
    }

    const story = await storyModel.findByIdAndDelete(storyId);
    res.status(200).json({
        message: "Story deleted successfully",
        story: story
    })
})


export const updateStory = asyncWrapper( async(req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    if (req.file) {
        const result = cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "Error in updating photo !try again" })
            }
        })
        story_photo_url = result.secure_url;
    }

    const storyId = req.params.id;
    const findId = await storyModel.findById(storyId);

    if (!findId) {
        return res.status(404).json({
            message: "Story not found"
        });
    }
    const story = await storyModel.findByIdAndUpdate(storyId, req.body, {new: true});

    res.status(200).json({
        message: "Story updated successfully!",
        story: story
    })
})

export const allStories = asyncWrapper( async( req,res, next ) => {
    const stories = await storyModel.find({});
    res.status(200).json({
        message: "All stories retrieved successfully!",
        stories: stories
    });
})

export const getStory = asyncWrapper( async(req, res, next) => {
    const storyId = req.params.id;
    const findId = await storyModel.findById(storyId);
    if(!findId) {
        return res.status(404).json({
            message: "Story not found"
        });
    }
    const story = await storyModel.findById(storyId);
    res.status(200).json({
        message: "Story retrieved successfully!",
        story: story   
    });
});