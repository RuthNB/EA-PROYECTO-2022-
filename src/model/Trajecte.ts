import { Schema, model } from 'mongoose';

const Trajecte = new Schema({
	name: String,
    puntInici: {
        type: Schema.Types.Array,
    },
    puntFinal: {
        type: Schema.Types.Array,
    },
    puntParada: {
        type: Schema.Types.Array,
    }
});

export default model('Trajecte', Trajecte);