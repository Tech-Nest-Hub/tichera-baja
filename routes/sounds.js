// routes/sounds.ts

import { deleteSound, getAllSounds, postSound } from '../controllers/SoundControllers.js';
import * as express from 'express';
import { upload } from '../middleware/multer.js';

const soundRoutes = express.Router();
// Get all sounds
soundRoutes.get('/', getAllSounds);

// Add new sound
soundRoutes.post('/',upload.single('audioFile'), postSound);

// Delete sound
soundRoutes.delete('/:id', deleteSound);

export default soundRoutes;