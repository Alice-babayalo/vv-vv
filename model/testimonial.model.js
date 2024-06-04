import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const testimonySchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name:{
        type: String,
        required: true
    },
    testimony:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const testimonyModel = mongoose.model('Testimonial', testimonySchema)

export default testimonyModel;