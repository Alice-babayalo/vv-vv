import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const albumSchema = mongoose.Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		photos: {
			type: [String],
		},
	},
	{
		timestamps: true,
	}
);

const albumModel = mongoose.model("Album", albumSchema);

export default albumModel;
