// models/Sound.ts
import mongoose from 'mongoose';

const SoundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: ''
    },
    url: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const Sound = mongoose.model('Sound', SoundSchema);
export default Sound