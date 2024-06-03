import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const albumShema = mongoose.Schema({
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
    timestamps: true 
}
);

const albumModel = mongoose.model('Album', albumShema)

export default albumModel