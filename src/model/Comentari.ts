import { Schema, model } from 'mongoose';

const Comentari = new Schema({
    autor: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	comentari: String,
	comentat: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
    valoracio: Number
});

export default model('Comentari', Comentari);