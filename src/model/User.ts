import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	password: String,
	email: String,
	naixement: {
		type: Schema.Types.Date
	},
	route: {
		type: Schema.Types.ObjectId,
		ref: "Route"
	},
	comentaris: {
		type: Schema.Types.ObjectId,
		ref: "Comentari"
	},
	reserva: {
		type: Schema.Types.ObjectId,
		ref: "Reserva"
	},
});

export default model('User', User);