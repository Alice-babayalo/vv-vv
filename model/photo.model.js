import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const photoShema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    url: {
        type: String
    },
    album: {
        type: String,
        ref: 'Rubumu',
        required: true
    }
},
    {
        timestamps: true
    })

const photoModel = mongoose.model('Photo', photoShema);

export default photoModel;