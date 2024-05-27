import { BadRequestError } from "../errors/index.js";
import asyncWrapper from "../middleware/async.js";
import photoModel from "../model/photo.model.js";


export const addPhoto = asyncWrapper( async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const album = await photoModel.create(req.body)

});