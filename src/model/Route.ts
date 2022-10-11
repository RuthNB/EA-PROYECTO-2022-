import { Schema, model } from 'mongoose';
import StopPoint from './StopPoint';
import User from './User';
import Participants from './Participant';

const Route = new Schema({
	name: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: User,
    },
    participants: {
        type: Schema.Types.ObjectId,
        ref: Participants,
    },
    startPoint: {
        type: Array,
    },
    endPoint: {
        type: Array,
    },
    stopPoint: {
        type: Schema.Types.ObjectId,
        ref: StopPoint,
    }
});

export default model('Route', Route);