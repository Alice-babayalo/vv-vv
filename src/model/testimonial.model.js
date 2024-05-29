import mongoose from "mongoose";


const testimonySchema = mongoose.Schema({
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
    timestamp: true
})

const testimonyModel = mongoose.model('Testimonial', testimonySchema)

export default testimonyModel;