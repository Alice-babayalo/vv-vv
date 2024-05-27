import { timeStamp } from "console";
import mongoose from "mongoose";
const albumShema = mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    description:{
        type: "string"
    }
},
{
    timeStamp:true
}
);

const albumModel = mongoose.model('Album', albumShema)

export default albumModel