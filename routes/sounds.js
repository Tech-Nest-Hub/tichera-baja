// routes/sounds.ts

import { deleteSound, getAllSounds, postSound } from '../controllers/SoundControllers.js';
import * as express from 'express';

const soundRoutes = express.Router();
// Get all sounds
soundRoutes.get('/', getAllSounds);

// Add new sound
soundRoutes.post('/', postSound);

// Delete sound
soundRoutes.delete('/:id', deleteSound);

export default soundRoutes;