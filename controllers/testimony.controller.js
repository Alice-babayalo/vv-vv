import asyncWrapper from "../middleware/async.js";
import {BadRequestError}  from "../errors/index.js";
import { validationResult } from 'express-validator';
import testimonyModel from "../model/testimonial.model.js";


export const addTestimony = asyncWrapper (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const testimony = await testimonyModel.create(req.body)
    res.status(201).json({
        message: "Testimony added successfully",
        testimony
    })
})

export const deleteTestimony = asyncWrapper(async (req, res, next) => {
    const testimony = await testimonyModel.findByIdAndDelete(req.params.id)
    if (!testimony) {
        res.status(404).json({ message: "testimony not found" });
    }
    res.status(200).json({ message: "testimony deleted successfully!", testimony });
});


export const allTestimonies = asyncWrapper(async (req, res, next) => {
    const all_testimonies = await testimonyModel.find({});
    res.status(200).json({
        number_of_testimonys: all_testimonies.length,
        all_testimonys: all_testimonies
    })
});

export const updateTestimony = asyncWrapper(async (req, res, next) => {
    const testimony = await testimonyModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!testimony) {
        res.status(404).json({ message: "Testimony not found" });
    }
    res.status(200).json({ message: "Testimony updated successfully!" , testimony: testimony });
})