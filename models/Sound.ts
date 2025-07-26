// models/Sound.ts
import mongoose, { Document } from 'mongoose';

export interface ISound extends Document {
    name: string;
    url: string;
}

const SoundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const Sound = mongoose.model<ISound>('Sound', SoundSchema);
export default Sound