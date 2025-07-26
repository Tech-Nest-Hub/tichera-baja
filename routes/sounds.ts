// routes/sounds.ts

import { deleteSound, getAllSounds, postSound } from '../controllers/SoundControllers';
import Sound from '../models/Sound';
import * as express from 'express';

const router = express.Router();
// Get all sounds
router.get('/', getAllSounds);

// Add new sound
router.post('/', postSound);

// Delete sound
router.delete('/:id', deleteSound);

export default router;