import { Schema, model } from 'mongoose';

const User = new Schema({
	name: String,
	dni: String,
	password: String,
	email: String,
	address: String,
	city: String,
	carsharing: Boolean,
	car: String,
	carID: String,
	insurance: String
});

export default model('User', User);