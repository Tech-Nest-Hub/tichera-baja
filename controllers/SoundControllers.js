// In your controllers/soundController.js
import Sound from "../models/Sound.js";
import fs from 'fs';
import path from 'path';

export const getAllSounds = async (req, res) => {
  try {
    const sounds = await Sound.find();
    res.json(sounds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sounds' });
  }
}

export const postSound = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const { name } = req.body;
    if (!name) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Name is required!" });
    }

    // Correct URL generation
    const fileUrl = `${req.protocol}://${req.get('host')}/api/uploads/sounds/${req.file.filename}`;

    const newSound = new Sound({
      name,
      url: fileUrl,
    });

    await newSound.save();

    res.status(201).json({
      success: true,
      message: "Sound uploaded!",
      sound: newSound,
    });

  } catch (error) {
    console.error("Error uploading sound:", error);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Failed to upload sound." });
  }
};

export const deleteSound = async (req, res) => {
  try {
    const sound = await Sound.findByIdAndDelete(req.params.id);
    
    if (!sound) {
      return res.status(404).json({ message: 'Sound not found' });
    }

    // Delete the associated file
    const filename = sound.url.split('/sounds/')[1];
    const filePath = path.join(__dirname, '../../uploads/sounds', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Sound deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sound' });
  }
}