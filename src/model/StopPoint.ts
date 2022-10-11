import { Schema, model } from 'mongoose';

const StopPoint = new Schema({
	name: String,
    stopPoint: {
        type: Array,
    }
});

export default model('StopPoint', StopPoint);