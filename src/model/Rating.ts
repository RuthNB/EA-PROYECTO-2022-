import { Schema, model } from 'mongoose';

const Rating = new Schema({
    author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	comment: String,
	dest: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    rate: Number
});

export default model('Rating', Rating);