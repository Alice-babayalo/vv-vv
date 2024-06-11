import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const storySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    story_photo_url: {
        type: String,
        required: true
    }
})

const storyModel = mongoose.model('Story', storySchema);

export default storyModel;