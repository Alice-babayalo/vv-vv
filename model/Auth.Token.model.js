import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        ref: "User",
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    role:{
        type: String,
        required: true
    }
});

const TokenModel = model("Token", TokenSchema);
export default TokenModel;