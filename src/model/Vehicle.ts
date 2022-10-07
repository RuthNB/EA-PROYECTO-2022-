import { Schema, model } from 'mongoose';

const Vehicle = new Schema({
	model: String,
	marca: String,
	any: {
		type: Schema.Types.Date
	},
	propietari: {
		type: Schema.Types.ObjectId,
		ref: "Propietari"
	},
});

export default model('Vehicle', Vehicle);