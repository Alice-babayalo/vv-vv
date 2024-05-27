import mongoose, { Schema } from "mongoose";

const photoShema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'album',
        required: true
    }
},
    {
        timestamps: true
    })

const photoModel = mongoose.model('Photo', photoShema);

export default photoModel;