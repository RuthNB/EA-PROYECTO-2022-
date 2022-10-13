import { Schema, model } from 'mongoose';
import Point from './Point';
import User from './User';
import Participant from './Participant';

const Route = new Schema({
	name: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: User,
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: User,
    }],
    startPoint: {
        type: Schema.Types.ObjectId,
        ref: Point,
    },
    endPoint: {
        type: Schema.Types.ObjectId,
        ref: Point,
    },
    stopPoint: [{
        type: Schema.Types.ObjectId,
        ref: Point,
    }]
});

export default model('Route', Route);