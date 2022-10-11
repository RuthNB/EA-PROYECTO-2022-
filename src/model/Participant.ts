import { Schema, model } from 'mongoose';
import User from './User';

const Participant = new Schema({
	name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
    }
});

export default model('Participant', Participant);