import { Schema, model } from 'mongoose';

const Reserva = new Schema({
	name: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	price: Number,
	trajecte: {
		type: Schema.Types.ObjectId,
		ref: "Trajecte"
	},
	pagada :{
		type: Schema.Types.Boolean,
	}
});

export default model('Reserva', Reserva);