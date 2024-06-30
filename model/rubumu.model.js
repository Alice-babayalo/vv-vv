import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const albumSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: "string",
        required: true
    },
    description:{
        type: "String"
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual property to populate photos
albumSchema.virtual('photos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'album'
});

const alubumu = mongoose.model('Rubumu', albumSchema);

export default alubumu;
